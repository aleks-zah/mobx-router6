import { lazy } from 'react';
import { TypedRoute } from 'mobx-router6';

export const HomepageRoute: TypedRoute<'index'> = {
  name: 'index',
  path: '/',
  comp: () => lazy(() => import('./index')),

  activate: () => {
    console.log('activated homepage page');
  },
};
