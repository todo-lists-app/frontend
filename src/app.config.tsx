interface AppConfig {
  apiURL: string;
  production: boolean;
  implementedFeatures: {
    [featureSet: string]: {
      [featureName: string]: boolean;
    }
  };
}

export const appConfig: AppConfig = {
  apiURL: process.env.REACT_APP_BACKEND_URL || "https://api.todo-list.app/v1",
  production: process.env.REACT_APP_PRODUCTION === "true",
  implementedFeatures: {
    "todo": {
      "encrypt": true,
      "decrypt": true,

      "add": true,
      "edit": false,
      "archive": false,
      "delete": false,
      "complete": false,

      "list": true,
      "listAll": false,
      "listCompleted": false,
      "listUncompleted": false,

      "sortBy": false,
      "sortByDate": false,
      "sortByPriority": false,
      "sortByAddDate": true,
      "sortByCompleteDate": false,
      "sortByUpdatedDate": false,

      "filterBy": false,
      "filterByPriority": false,
      "filterByDate": false,
      "filterByCompleteDate": false,
      "filterByUpdatedDate": false,
    },
    "account": {
      "login": true,
      "logout": true,
      "register": true,
      "delete": false,
      "update": false,
    },
    "notifications": {
      "email": false,
      "sms": false,
      "push": false,
      "update": false,
      "slack": false,
    }
  }
}

interface ShowFeatureProps {
  featureSet: string;
  featureName: string;
}

export const isFeatureImplemented = ({ featureSet, featureName }: ShowFeatureProps): boolean => {
  if (!appConfig.implementedFeatures[featureSet]) {
    return false;
  }


  if (appConfig.implementedFeatures[featureSet][featureName]) {
    return true;
  }

  return !appConfig.production;
}
