import { IAuthProvider } from "@inube/iauth-react";
import { useAuthWrapper } from "@hooks/authentication/useAuthWrapper";
import { enviroment } from "@config/environment";
import { IAuthWrapper } from "@ptypes/IAuthWrapper";

const AuthWrapper = ({ children }: IAuthWrapper) => {
  const { originatorId, originatorCode, applicationName } = useAuthWrapper();

  return (
    <IAuthProvider
      originatorId={originatorId}
      originatorCode={originatorCode}
      applicationName={applicationName}
      callbackUrl={enviroment.REDIRECT_URI}
      iAuthUrl={enviroment.IAUTH_URL}
      serviceUrl={enviroment.IAUTH_SERVICE_URL}
      codeVerifier={enviroment.CODE_VERIFIER}
      codeChallenge={enviroment.CODE_CHALLENGE}
      state={enviroment.STATE}
    >
      {children}
    </IAuthProvider>
  );
};

export { AuthWrapper };
