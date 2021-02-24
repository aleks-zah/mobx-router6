import { action, computed, observable, reaction, makeObservable } from 'mobx';
import { Router, State } from 'router5';
import { IRoute, RouterState, Names, TypedRoute, Params } from './types';

const defaultState: RouterState<'index'> = {
  name: 'index',
  params: {},
  path: '',
};

export class RouterStore<RoutesUnion extends IRoute> {
  @computed get params() {
    if (this.route) return this.route.params;

    return {};
  }
  public routes: Record<
    Names<RoutesUnion>,
    TypedRoute<
      Names<RoutesUnion>,
      Params<RoutesUnion> extends object
        ? Params<RoutesUnion>
        : Record<string, any>,
      RouterStore<RoutesUnion>
    >
  >;
  public router: Router;

  @observable public route: RouterState<Names<RoutesUnion>> = observable(
    defaultState,
  );

  constructor() {
    // @ts-ignore
    this.routes = null;
    // @ts-ignore
    this.router = null;

    reaction(
      () => this.route.name,
      () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    );
    makeObservable(this);
  }

  @action setRoute = (route: RouterState<Names<RoutesUnion>>) =>
    (this.route = route);
  @action setRouteParams = ({ params }: State) => (this.route.params = params);

  goTo = ({ name, params }: RoutesUnion) => {
    this.router.navigate(name, { ...this.params, ...params });
  };

  @computed get currentRouteName() {
    return this.route.name;
  }
}

export const routerStore = new RouterStore();
