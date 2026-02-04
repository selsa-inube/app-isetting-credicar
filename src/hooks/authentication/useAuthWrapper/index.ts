import { useEffect, useMemo, useState } from "react";
import { encrypt } from "@utils/crypto/encrypt";
import { readAuthFromLocalStorage } from "@utils/readAuthFromLocalStorage";
import { IAuthLocalStorageSnapshot } from "@ptypes/context/authLocalStorageSnapshot";
import { AUTH_STORAGE_UPDATED_EVENT } from "@utils/storeEncryptedData";

const persistFromQueryParams = (params: URLSearchParams) => {
  const originatorId = params.get("originatorId");
  const originatorCode = params.get("originatorCode");
  const applicationName = params.get("applicationName");
  const portal = params.get("portal");

  if (originatorId) localStorage.setItem("originatorId", encrypt(originatorId));
  if (originatorCode)
    localStorage.setItem("originatorCode", encrypt(originatorCode));
  if (applicationName)
    localStorage.setItem("aplicationName", encrypt(applicationName));
  if (portal) localStorage.setItem("portalCode", encrypt(portal));
};

const useAuthWrapper = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const [snapshot, setSnapshot] = useState<IAuthLocalStorageSnapshot>(() => {
    persistFromQueryParams(params);
    return readAuthFromLocalStorage(params.get("portal"));
  });

  useEffect(() => {
    const sync = () => {
      setSnapshot(readAuthFromLocalStorage(params.get("portal")));
    };

    sync();

    window.addEventListener(AUTH_STORAGE_UPDATED_EVENT, sync);

    return () => {
      window.removeEventListener(AUTH_STORAGE_UPDATED_EVENT, sync);
    };
  }, []);

  return useMemo(() => snapshot, [snapshot]);
};

export { useAuthWrapper };
