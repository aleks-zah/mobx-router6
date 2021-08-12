import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';
import './App.css';
import { initRouter, useRoute } from 'mobx-router6';
import { routes } from './routes';
import { observer } from 'mobx-react-lite';

// router store (mobx)
const routerStore = initRouter(routes);

// router5 api
routerStore.router.start();

// expose routerStore to debug its contents via global object
// make sure not to slip it into prod
(window as any).routerStore = routerStore;

const Layout = (props?: PropsWithChildren<{}>) => {
  return (
    <div style={{ border: '1px solid red' }}>{props && props.children}</div>
  );
};

function App() {
  const { RouteComponent, WrapperComponent } = useRoute({
    defaultWrapper: Layout,
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current component:</p>
        <WrapperComponent>
          <React.Suspense fallback={<div>spinner</div>}>
            {RouteComponent && <RouteComponent />}
          </React.Suspense>
        </WrapperComponent>
      </header>
    </div>
  );
}

export default observer(App);
