import {AuthProviderProps} from "react-oidc-context";
import {User, WebStorageStateStore} from "oidc-client-ts";

const signinCallback = (_user: User | void ) => {
  window.history.replaceState({}, document.title, window.location.pathname);
}

export const oidcConfig = {
  authority: process.env.REACT_APP_KEYCLOAK_URL,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  client_secret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
  redirect_uri: window.location.origin,
  onSigninCallback: signinCallback,
} as AuthProviderProps;
