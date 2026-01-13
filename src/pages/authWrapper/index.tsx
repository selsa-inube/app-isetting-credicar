import { IAuthProvider } from "@inube/iauth-react";
import { useAuthWrapper } from "@hooks/authentication/useAuthWrapper";
import { enviroment } from "@config/environment";
import { IAuthWrapper } from "@ptypes/IAuthWrapper";

const AuthWrapper = ({ children }: IAuthWrapper) => {
  const { clientIdDecrypt, publicCodeDecrypt, aplicationNameDecrypt } =
    useAuthWrapper();

  return (
    <IAuthProvider
      originatorId={clientIdDecrypt}
      callbackUrl={enviroment.REDIRECT_URI}
      iAuthUrl={enviroment.IAUTH_URL}
      serviceUrl={enviroment.IAUTH_SERVICE_URL}
      codeVerifier={enviroment.CODE_VERIFIER}
      codeChallenge={enviroment.CODE_CHALLENGE}
      state={enviroment.STATE}
      applicationName={aplicationNameDecrypt}
      originatorCode={publicCodeDecrypt}
    >
      {children}
    </IAuthProvider>
  );
};

export { AuthWrapper };
