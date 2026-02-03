import { useEffect, useMemo, useState } from "react";
import { encrypt } from "@utils/crypto/encrypt";
import { IAuthLocalStorageSnapshot } from "@ptypes/context/authLocalStorageSnapshot";
import { readAuthFromLocalStorage } from "@utils/readAuthFromLocalStorage";

const useAuthWrapper = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");

  const [snapshot, setSnapshot] = useState<IAuthLocalStorageSnapshot>(() =>
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
