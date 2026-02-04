import { useEffect } from "react";
import { decrypt } from "@utils/crypto/decrypt";
import { encrypt } from "@utils/crypto/encrypt";

const useAuthWrapper = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";

  const clientId = localStorage.getItem("originatorId");
  const publicCode = localStorage.getItem("originatorCode");
  const aplicationName = localStorage.getItem("aplicationName");
  const clientIdDecrypt = decrypt(clientId ?? "");
  const publicCodeDecrypt = decrypt(publicCode ?? "");
  const aplicationNameDecrypt = decrypt(aplicationName ?? "");

  useEffect(() => {
    if (portalParam && portalParam !== decryptedPortal) {
      const encryptedPortal = encrypt(portalParam);
      localStorage.setItem("portalCode", encryptedPortal);
    }
  }, [portalParam, decryptedPortal]);

  return {
    clientIdDecrypt,
    publicCodeDecrypt,
    aplicationNameDecrypt,
  };
};

export { useAuthWrapper };
