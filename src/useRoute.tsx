import React, { PropsWithChildren, useMemo } from 'react';
import { IRoute } from './types';
import { routerStore } from './store';

interface Props<RoutesUnion extends IRoute> {
  defaultWrapper?: any;
}

const FallbackWrapper = (props: PropsWithChildren<{}>) => (
  <div>{props && props.children}</div>
);

export function useRoute<T extends IRoute>({ defaultWrapper }: Props<T> = {}) {
  const wrapper = defaultWrapper || FallbackWrapper;

  return useMemo(() => {
    const route = routerStore.routes[routerStore.route.name];

    if (route) {
      return {
        RouteComponent: route.comp(),
        WrapperComponent: route.wrapper || wrapper,
      };
    }

    return {
      RouteComponent: null,
      WrapperComponent: wrapper,
    };
  }, [routerStore.routes, routerStore.route.name]);
}
