const IS_PRODUCTION = import.meta.env.PROD;
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI as string;

const maxRetriesServices = 10;
const maxRetriesPost = 1;
const maxRetriesDelete = 1;

const fetchTimeoutServices = 6000;

const mediaQueryMobile = "(max-width: 770px)";

const enviroment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  SECRET_KET_PORTAL_ID: import.meta.env.VITE_SECRET_KEY_PORTAL_ID,
  SECRET_KET_PORTAL_IV: import.meta.env.VITE_SECRET_KEY_PORTAL_IV,
  REDIRECT_URI: IS_PRODUCTION ? window.location.origin : AUTH_REDIRECT_URI,
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_ISAAS_QUERY_PROCESS_SERVICE,
  IPORTAL_STAFF_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IPORTAL_STAFF_QUERY_PROCESS_SERVICE,
  ISETTING_CREDICAR_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_ISETTING_CREDICAR_QUERY_PROCESS_SERVICE,
  ISETTING_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_ISETTING_QUERY_PROCESS_SERVICE,
  ISAAS_PERSISTENCE_PROCESS_SERVICE: import.meta.env
    .VITE_ISAAS_PERSISTENCE_PROCESS_SERVICE,
  ISAAS_TOKEN_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_ISAAS_TOKEN_QUERY_PROCESS_SERVICE,
};

export {
  enviroment,
  mediaQueryMobile,
  maxRetriesServices,
  maxRetriesPost,
  maxRetriesDelete,
  fetchTimeoutServices,
};
