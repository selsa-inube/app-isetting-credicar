import { decrypt } from "../crypto/decrypt";

const safeDecrypt = (value?: string | null) => {
  if (!value) return "";
  try {
    return decrypt(value);
  } catch {
    return "";
  }
};
export { safeDecrypt };
