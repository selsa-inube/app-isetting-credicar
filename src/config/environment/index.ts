const maxRetriesServices = 3;
const maxRetriesPost = 1;
const maxRetriesDelete = 1;

const fetchTimeoutServices = 6000;

const mediaQueryMobile = "(max-width: 770px)";
const mediaQueryTablet = "(max-width: 1281px)";
const mediaQueryTabletMain = "(max-width: 1000px)";
const mediaQueryMobileSmall = "(max-width: 450px)";

const maxWidthLineConstruction = "1394px";
const maxWidthOtherPages = "1064px";

const stripLeadingSlash = (u?: string) => u?.replace(/^\/+/, "") ?? undefined;
const configTranslate = {
  url: stripLeadingSlash(
    import.meta.env.VITE_URL_TRANSLATE as string | undefined,
  ),
  apiKey: import.meta.env.VITE_API_KEY_TRANSLATE as string | undefined,
};

const enviroment = {
  SECRET_KET_PORTAL_ID: import.meta.env.VITE_SECRET_KEY_PORTAL_ID,
  SECRET_KET_PORTAL_IV: import.meta.env.VITE_SECRET_KEY_PORTAL_IV,
  REDIRECT_URI: window.location.origin,
  PORTAL_CATALOG_CODE: import.meta.env.VITE_PORTAL_CATALOG_CODE,
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
  VITE_LANGUAGE: import.meta.env.VITE_LANGUAGE as string,
  ORIGINATOR_ID: import.meta.env.VITE_ORIGINATOR_ID as string,
  IAUTH_URL: import.meta.env.VITE_IAUTH_URL as string,
  IAUTH_SERVICE_URL: import.meta.env.VITE_IAUTH_SERVICE_URL as string,
  CODE_VERIFIER: import.meta.env.VITE_AUTH_CODE_VERIFIER as string,
  CODE_CHALLENGE: import.meta.env.VITE_AUTH_CODE_CHALLENGE as string,
  STATE: import.meta.env.VITE_AUTH_STATE as string,
  APPLICATION_NAME: import.meta.env.VITE_APPLICATION_NAME as string,
  ORIGINATOR_CODE: import.meta.env.VITE_ORIGINATOR_CODE as string,
};

export {
  enviroment,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryTabletMain,
  mediaQueryMobileSmall,
  maxWidthLineConstruction,
  maxWidthOtherPages,
  maxRetriesServices,
  maxRetriesPost,
  maxRetriesDelete,
  fetchTimeoutServices,
  configTranslate,
};
