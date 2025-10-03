import { IAuthProvider } from "@inube/iauth-react";
import { usePortalData } from "@hooks/staffPortal/usePortalData";
import { useBusinessManagers } from "@hooks/staffPortal/useBusinessManagers";
import { enviroment } from "@config/environment";
import { decrypt } from "@utils/crypto/decrypt";

const StoredPortal = localStorage.getItem("portalCode");

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { portalData } = usePortalData(decrypt(String(StoredPortal)));
  const { businessManagersData } = useBusinessManagers(portalData);

  return (
    <IAuthProvider
      originatorId={enviroment.ORIGINATOR_ID}
      callbackUrl={enviroment.REDIRECT_URI}
      iAuthUrl={enviroment.IAUTH_URL}
      clientId={decrypt(businessManagersData.clientId)}
      clientSecret={decrypt(businessManagersData.clientSecret)}
    >
      {children}
    </IAuthProvider>
  );
}

export { AuthWrapper };
