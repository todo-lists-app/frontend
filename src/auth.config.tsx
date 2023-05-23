import {AuthProviderProps} from "react-oidc-context";

export const oidcConfig = {
  authority: process.env.REACT_APP_KEYCLOAK_URL,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  client_secret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
  redirect_uri: window.location.origin
} as AuthProviderProps;
