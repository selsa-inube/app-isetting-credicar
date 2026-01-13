import { encrypt } from "../crypto/encrypt";

const storeEncryptedData = (data: Record<string, string>) => {
  const storageKeys = {
    originatorId: data.originatorId,
    originatorCode: data.originatorCode,
    aplicationName: data.aplicationName,
  };

  Object.entries(storageKeys).forEach(([key, value]) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, encrypt(value));
    }
  });
};

export { storeEncryptedData };
