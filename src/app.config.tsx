let apiURL = process.env.REACT_APP_BACKEND_URL;
if (process.env.NODE_ENV === 'development' || apiURL === undefined) {
  apiURL = 'http://localhost:3001'
}

export const appConfig = {
  apiURL: apiURL
}
