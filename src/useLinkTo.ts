import React from 'react';
import { routerStore } from './store';
import { IRoute } from './types';

type OnClick = (e?: React.MouseEvent<{}>) => void;

export function useLinkToRoute<Routes extends IRoute>(
  route: Routes,
  onClick?: OnClick,
) {
  const { router, goTo } = routerStore;

  function onClickInner(e?: React.MouseEvent<any>) {
    if (typeof onClick === 'function') onClick(e);
    if (!e) return;
    if (e.button === 1 || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    goTo(route);
  }

  if (!router) {
    console.error('Invalid router configuration');

    return {
      href: '', // 404
      onClick: () => void 0,
    };
  }

  const href = router.buildPath(route.name, route.params || {});

  return { href, onClick: onClickInner };
}

export function useLink<RouteName extends string>(
  routeName: RouteName,
  onClick?: OnClick,
) {
  const { routes } = routerStore;

  const maybeRoute = routes[routeName];

  if (!maybeRoute) {
    throw new Error(
      `Unrecognized route passed to Link component: ${routeName}, expected one of: [${Object.keys(
        routes,
      ).join(', ')}]. Are you sure you passed this route in initRouter()?`,
    );
  }

  return useLinkToRoute(maybeRoute, onClick);
}

export function useParamsLink<T extends object>(
  params: T,
  onClick?: (e?: React.MouseEvent<{}>) => void,
) {
  return useLinkToRoute({ params, name: routerStore.route.name }, onClick);
}
