import { useEffect, useMemo, useState } from "react";
import { encrypt } from "@utils/crypto/encrypt";
import { decrypt } from "@utils/crypto/decrypt";
import { IAuthLocalStorageSnapshot } from "@ptypes/context/authLocalStorageSnapshot";

const readFromQueryOrStorage = (
  params: URLSearchParams,
): IAuthLocalStorageSnapshot => {
  const qpOriginatorId = params.get("originatorId");
  const qpOriginatorCode = params.get("originatorCode");
  const qpApplicationName = params.get("applicationName");
  const qpPortal = params.get("portal");

  const lsOriginatorId = localStorage.getItem("originatorId");
  const lsOriginatorCode = localStorage.getItem("originatorCode");
  const lsApplicationName =
    localStorage.getItem("aplicationName") ??
    localStorage.getItem("applicationName");
  const lsPortal = localStorage.getItem("portalCode");

  const originatorId = qpOriginatorId
    ? qpOriginatorId
    : lsOriginatorId
      ? decrypt(lsOriginatorId)
      : "";

  const originatorCode = qpOriginatorCode
    ? qpOriginatorCode
    : lsOriginatorCode
      ? decrypt(lsOriginatorCode)
      : "";

  const applicationName = qpApplicationName
    ? qpApplicationName
    : lsApplicationName
      ? decrypt(lsApplicationName)
      : "";

  const portalCode = qpPortal ? qpPortal : lsPortal ? decrypt(lsPortal) : "";

  const isReady = Boolean(originatorId && originatorCode && applicationName);

  return {
    originatorId,
    originatorCode,
    applicationName,
    portalCode,
    isReady,
  };
};

const persistEncrypted = (params: URLSearchParams) => {
  const entries = [
    ["originatorId", "originatorId"],
    ["originatorCode", "originatorCode"],
    ["applicationName", "aplicationName"],
    ["portal", "portalCode"],
  ] as const;

  entries.forEach(([qpKey, storageKey]) => {
    const value = params.get(qpKey);
    if (value) {
      localStorage.setItem(storageKey, encrypt(value));
    }
  });
};

const useAuthWrapper = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const [snapshot, setSnapshot] = useState<IAuthLocalStorageSnapshot>(() =>
    readFromQueryOrStorage(params),
  );

  useEffect(() => {
    persistEncrypted(params);

    setSnapshot(readFromQueryOrStorage(params));
  }, []);

  return useMemo(() => snapshot, [snapshot]);
};

export { useAuthWrapper };
