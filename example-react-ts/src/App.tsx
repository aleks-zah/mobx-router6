import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { initRouter, RouterStoreCtx, useRoute } from './routing';
import { routes } from './routes';

const store = initRouter(routes); // router store (mobx)

store.router.start(); // router5 api

(window as any).routerStore = store;

function App() {
  const { WrapperComponent, RouteComponent } = useRoute();
  const { route } = useContext(RouterStoreCtx);

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

export default App;
