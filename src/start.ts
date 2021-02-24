import { Router, State, createRouter } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { observable } from 'mobx';
import { IRoute, StoreBase, TypedRoute, Names } from './types';
import { routerStore, RouterStore } from './store';

export const createRoutesMap = <
  T extends TypedRoute<string, {}, RouterStore<IRoute>>
>(
  routes: readonly T[],
) =>
  routes.reduce(
    (acc, route) => ({
      ...acc,
      [route.name]: route,
    }),
    {} as Record<Names<T>, T>,
  );

function makeMobxRouterPlugin<
  S extends StoreBase,
  Routes extends Record<string, TypedRoute<string, {}, S>>
>(routesMap: Routes, routerStoreParam: S) {
  function mobxRouterPlugin() {
    return {
      onTransitionSuccess(nextStateArg: State, prevStateArg?: State) {
        const nextState = {
          ...nextStateArg,
          params: observable(nextStateArg.params),
        };

        const prevState = prevStateArg || ({} as State);

        const prevParams = prevState.params || {};
        const nextParams = nextState.params || {};
        const prevRoute = routesMap[prevState.name];
        const nextRoute = routesMap[nextState.name];

        if (
          prevRoute != null &&
          prevRoute.deactivate != null &&
          typeof prevRoute.deactivate === 'function'
        ) {
          prevRoute.deactivate(routerStoreParam, prevParams, nextState);
        }

        if (!prevState || prevState.name !== nextState.name) {
          routerStoreParam.setRoute(nextState);
        } else if (typeof routerStoreParam.setRouteParams === 'function') {
          routerStoreParam.setRouteParams(nextState);
        }

        if (typeof nextRoute.activate === 'function') {
          nextRoute.activate(routerStoreParam, nextParams, prevState || {});
        }
      },
    };
  }

  mobxRouterPlugin.pluginName = 'MOBX_PLUGIN';

  return mobxRouterPlugin;
}

export function makeMobxRouter<S extends StoreBase>(
  routesMap: Record<string, TypedRoute<string, {}, S>>,
  store: S,
): Router {
  const router = createRouter(Object.values(routesMap), {
    defaultRoute: 'not-found',
  });

  router.usePlugin(
    browserPlugin(),
    makeMobxRouterPlugin<S, Record<string, TypedRoute<string, {}, S>>>(
      routesMap,
      store,
    ),
  );

  return router;
}

export function initRouter<RoutesUnion extends TypedRoute<string, {}, object>>(
  routes: readonly RoutesUnion[],
) {
  routerStore.routes = createRoutesMap(routes);

  routerStore.router = makeMobxRouter(routerStore.routes, routerStore);

  return routerStore;
}
