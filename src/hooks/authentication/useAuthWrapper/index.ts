import { useEffect, useMemo, useState } from "react";
import { decrypt } from "@utils/crypto/decrypt";
import { encrypt } from "@utils/crypto/encrypt";

interface AuthLocalStorageSnapshot {
  originatorId: string;
  originatorCode: string;
  applicationName: string;
  portalCode: string;
  isReady: boolean;
}

const safeDecrypt = (value?: string | null) => {
  if (!value) return "";
  try {
    return decrypt(value);
  } catch {
    return "";
  }
};

const readAuthFromLocalStorage = (
  portalParam?: string | null,
): AuthLocalStorageSnapshot => {
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

const useAuthWrapper = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");

  const [snapshot, setSnapshot] = useState<AuthLocalStorageSnapshot>(() =>
    readAuthFromLocalStorage(portalParam),
  );

  useEffect(() => {
    if (!portalParam) return;

    const encryptedPortal = encrypt(portalParam);
    localStorage.setItem("portalCode", encryptedPortal);

    setSnapshot((prev) => ({
      ...prev,
      portalCode: portalParam,
    }));
  }, [portalParam]);

  useEffect(() => {
    let cancelled = false;

    const sync = () => {
      const next = readAuthFromLocalStorage(portalParam);

      setSnapshot((prev) => {
        const same =
          prev.originatorId === next.originatorId &&
          prev.originatorCode === next.originatorCode &&
          prev.applicationName === next.applicationName &&
          prev.portalCode === next.portalCode &&
          prev.isReady === next.isReady;

        return same ? prev : next;
      });

      return next.isReady;
    };

    if (sync()) return;

    const intervalId = window.setInterval(() => {
      if (cancelled) return;
      const ready = sync();
      if (ready) window.clearInterval(intervalId);
    }, 200);

    const onStorage = () => {
      if (cancelled) return;
      const ready = sync();
      if (ready) window.clearInterval(intervalId);
    };
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener("storage", onStorage);
    };
  }, [portalParam]);

  return useMemo(() => snapshot, [snapshot]);
};

export { useAuthWrapper };
