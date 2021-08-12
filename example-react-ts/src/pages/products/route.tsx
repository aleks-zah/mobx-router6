import { lazy } from 'react';
import { TypedRoute } from 'mobx-router6';

export const ProductsRoute: TypedRoute<'products', { id?: string }> = {
  name: 'products',
  path: '/products?id',
  comp: () => lazy(() => import('./index')),

  activate: () => {
    console.log('activated products page');
  },
};
