import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import './index.scss';
import App from './App'

function AppContainer(){
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={ store }>
          <PersistGate persistor={persistor}>
            <App/>
          </PersistGate>
        </Provider>
        <ToastContainer/>
      </React.StrictMode>
    </BrowserRouter>
  )
};

const container = document.getElementById('root')   
const root = createRoot(container)

root.render(<AppContainer/>)