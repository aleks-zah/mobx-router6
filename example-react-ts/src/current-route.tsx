import React, { useContext } from 'react';
import { RouterStoreCtx } from './routing';
import { observer } from 'mobx-react-lite';

export const CurrentRoute = observer(() => {
  const routerStore = useContext(RouterStoreCtx);

  if (!routerStore.route) {
    return null;
  }

  const route = routerStore.routes[routerStore.route.name];

  if (!route) return null;

  const Component = route && route.comp();

  return (
    <React.Suspense fallback={<div>spinner</div>}>
      {Component && <Component />}
    </React.Suspense>
  );
});
