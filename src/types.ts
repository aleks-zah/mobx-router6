import { State, Route } from 'router5';
import { PropsWithChildren } from 'react';

export type ValueOf<T> = T[keyof T];

export interface RouterState<T extends string> extends State {
  name: T;
}

export interface IRoute<Params = {}> {
  name: string;
  params?: Record<string, any>;
}

export type Names<RoutesUnion extends IRoute> = ValueOf<
  Pick<RoutesUnion, 'name'>
>;

export type Params<RoutesUnion extends IRoute> = ValueOf<
  Pick<RoutesUnion, 'params'>
>;

export interface StoreBase {
  route: State | null;
  setRoute: (nextRoute: RouterState<string>) => void;
  setRouteParams: (nextState: State) => void;
}

export interface TypedRoute<
  RouteName extends string,
  Params extends Record<string, any> = {},
  Store extends object = {}
> extends Route {
  name: RouteName;

  params?: Params;

  comp: (next?: Params) => any;

  activate?: (store: Store, current?: Params, prev?: State) => void;

  deactivate?: (store: Store, current?: Params, next?: State) => void;

  wrapper?: (props: PropsWithChildren<any>) => JSX.Element | null;
}
