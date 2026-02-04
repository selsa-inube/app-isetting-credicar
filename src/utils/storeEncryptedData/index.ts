import { encrypt } from "@utils/crypto/encrypt";

interface StoreEncryptedData {
  originatorId?: string;
  originatorCode?: string;
  aplicationName?: string;
  portalCode?: string;
}

const AUTH_STORAGE_UPDATED_EVENT = "auth:storage-updated";

const storeEncryptedData = (data: StoreEncryptedData) => {
  if (data.originatorId) {
    localStorage.setItem("originatorId", encrypt(data.originatorId));
  }

  if (data.originatorCode) {
    localStorage.setItem("originatorCode", encrypt(data.originatorCode));
  }

  if (data.aplicationName) {
    localStorage.setItem("aplicationName", encrypt(data.aplicationName));
  }

  if (data.portalCode) {
    localStorage.setItem("portalCode", encrypt(data.portalCode));
  }

  window.dispatchEvent(new Event(AUTH_STORAGE_UPDATED_EVENT));
};

export { storeEncryptedData, AUTH_STORAGE_UPDATED_EVENT };
