import React from 'react';
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

function App() {
  const { RouteComponent } = useRoute({ routerStore });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current component:</p>
        <React.Suspense fallback={<div>spinner</div>}>
          {RouteComponent && <RouteComponent />}
        </React.Suspense>
      </header>
    </div>
  );
}

export default observer(App);
