import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from "react-oidc-context";

import App from './App';
import {oidcConfig} from "./auth.config";
import './index.css'
import * as serviceWorker from './lib/notifications/serviceWorker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
