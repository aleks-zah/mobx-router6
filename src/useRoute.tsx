import React, { PropsWithChildren, useEffect, useState } from 'react';
import { IRoute } from './types';
import { routerStore } from './store';

interface Props<RoutesUnion extends IRoute> {
  defaultWrapper?: any;
}

const fallbackWrapper = (props: PropsWithChildren<{}>) => (
  <div>{props && props.children}</div>
);

export function useRoute<T extends IRoute>({ defaultWrapper }: Props<T> = {}) {
  const [RouteComponent, setRouteComponent] = useState<any>(null);
  const [WrapperComponent, setWrapperComponent] = useState(
    defaultWrapper || fallbackWrapper,
  );

  useEffect(() => {
    const route = routerStore.routes[routerStore.route.name];

    if (!route) {
      return;
    }

    setRouteComponent(route.comp());
    if (route.wrapper) setWrapperComponent(route.wrapper);
  }, [routerStore.routes, routerStore.route.name]);

  return {
    RouteComponent,
    WrapperComponent,
  };
}
