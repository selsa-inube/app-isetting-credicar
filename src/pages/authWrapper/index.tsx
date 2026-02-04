import { IAuthProvider } from "@inube/iauth-react";
import { useAuthWrapper } from "@hooks/authentication/useAuthWrapper";
import { enviroment } from "@config/environment";
import { IAuthWrapper } from "@ptypes/IAuthWrapper";
// import { Loading } from "../login/loading";

const AuthWrapper = ({ children }: IAuthWrapper) => {
  const { originatorId, originatorCode, applicationName, isReady } =
    useAuthWrapper();

  console.log(
    "AuthWrapper - isReady:",
    originatorId,
    originatorCode,
    applicationName,
    isReady,
  );
  // if (!isReady) {
  //   return <Loading />;
  // }

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
