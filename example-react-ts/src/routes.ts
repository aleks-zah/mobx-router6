import { ProductsRoute } from './pages/products/route';
import { HomepageRoute } from './pages/home/route';
import { createRoutesMap } from './routing';

export const routes = [ProductsRoute, HomepageRoute] as const; // array app routes

export const routesMap = createRoutesMap(routes);
