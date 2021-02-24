import React, { PropsWithChildren } from 'react';
import { useObserver } from 'mobx-react-lite';
import { routerStore } from './store';

interface Props {
  defaultWrapper?: any;
}

const fallbackWrapper = (props: PropsWithChildren<{}>) => (
  <div>{props && props.children}</div>
);

export const useRoute = ({ defaultWrapper }: Props = {}) => {
  const wrapper = defaultWrapper || fallbackWrapper;

  return useObserver(() => {
    if (!routerStore.route) {
      return {
        RouteComponent: null,
        WrapperComponent: wrapper,
      };
    }

    const route = routerStore.routes[routerStore.route.name];

    if (!route) {
      return {
        RouteComponent: null,
        WrapperComponent: wrapper,
      };
    }

    return {
      RouteComponent: route && route.comp(),
      WrapperComponent: (route && route.wrapper) || wrapper,
    };
  });
};
