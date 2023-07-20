interface AppConfig {
  services: {
    ping: string;
    api: string;
  }
  production: boolean;
  notification: {
    key: string;
    address: string;
  }
  implementedFeatures: {
    [featureSet: string]: {
      [featureName: string]: boolean;
    }
  };
}

export const appConfig: AppConfig = {
  services: {
    ping: process.env.REACT_APP_PING_URL || "https://ping.todo-list.app/v1",
    api: process.env.REACT_APP_BACKEND_URL || "https://api.todo-list.app/v1",
  },
  production: process.env.REACT_APP_PRODUCTION === "true",
  notification: {
    key: process.env.REACT_APP_NOTIFICATION_KEY || "BIZS8VXZKiWXGjcIAt2EA-2s4aY9w87rRu1cVshjWx7yzl_jrPvhAbL9X3WpdaNa_1fgpUbjk1I6C-OPscEwR5k",
    address: process.env.REACT_APP_NOTIFICATION_ADDRESS || "/service-worker.js",
  },
  implementedFeatures: {
    "todo": {
      "encrypt": true,
      "decrypt": true,

      "add": true,
      "edit": true,
      "archive": true,
      "delete": true,
      "complete": true,

      "list": true,
      "listAll": true,
      "listCompleted": false,
      "listUncompleted": true,

      "sortBy": true,
      "sortByDueDate": true,
      "sortByPriority": true,
      "sortByCreationDate": true,
      "sortByUpdatedDate": true,

      "filterBy": true,
      "filterByPriority": true,
      "filterByDate": false,
      "filterByCompleteDate": false,
      "filterByUpdatedDate": true,

      "subTasks": true,
    },
    "account": {
      "login": true,
      "logout": true,
      "register": true,
      "delete": false,
      "update": true,
    },
    "notifications": {
      "email": false,
      "sms": false,
      "push": false,
      "update": false,
      "slack": false,
      "alert": false,
      "list": false,
    },
    "profile": {
      "activity": false,
      "settings": true,
      "todos": false,
      "tasks": false,
      "reports": false,
    }
  },
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
