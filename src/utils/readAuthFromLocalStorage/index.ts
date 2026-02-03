import { IAuthLocalStorageSnapshot } from "@ptypes/context/authLocalStorageSnapshot";
import { safeDecrypt } from "../safeDecrypt";

const readAuthFromLocalStorage = (
  portalParam?: string | null,
): IAuthLocalStorageSnapshot => {
  const encryptedOriginatorId = localStorage.getItem("originatorId");
  const encryptedOriginatorCode = localStorage.getItem("originatorCode");
  const encryptedApplicationName =
    localStorage.getItem("aplicationName") ??
    localStorage.getItem("applicationName");

  const encryptedPortal = localStorage.getItem("portalCode");

  const originatorId = safeDecrypt(encryptedOriginatorId);
  const originatorCode = safeDecrypt(encryptedOriginatorCode);
  const applicationName = safeDecrypt(encryptedApplicationName);
  const portalCode = portalParam?.length
    ? portalParam
    : safeDecrypt(encryptedPortal);

  const isReady = Boolean(originatorId && originatorCode && applicationName);

  return {
    originatorId,
    originatorCode,
    applicationName,
    portalCode,
    isReady,
  };
};

export { readAuthFromLocalStorage };
