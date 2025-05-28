import { createContext } from "react";
import { IAuthAndPortalData } from "@ptypes/context/authAndPortalDataProvider/IAuthAndPortalData";
import { useValidatingLoginInformation } from "@hooks/context/useValidatingLoginInformation";

const AuthAndPortalData = createContext<IAuthAndPortalData>(
  {} as IAuthAndPortalData,
);
interface IAuthAndPortalDataProvider {
  children: React.ReactNode;
}

function AuthAndPortalDataProvider(props: IAuthAndPortalDataProvider) {
  const { children } = props;
  const { authAndPortalDataContainer } = useValidatingLoginInformation();
  return (
    <AuthAndPortalData.Provider value={authAndPortalDataContainer}>
      {children}
    </AuthAndPortalData.Provider>
  );
}

export { AuthAndPortalData, AuthAndPortalDataProvider };
export type { IAuthAndPortalDataProvider };
