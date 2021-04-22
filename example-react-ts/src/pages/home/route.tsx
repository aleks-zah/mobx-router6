import { lazy } from 'react';
import { TypedRoute } from '../../routing';

export const HomepageRoute: TypedRoute<'index'> = {
  name: 'index',
  path: '/',
  comp: () => lazy(() => import('./index')),

  activate: () => {
    console.log('activated homepage page');
  },
};
