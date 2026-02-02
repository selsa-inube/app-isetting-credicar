import { RouterProvider } from "react-router-dom";
import { FlagProvider } from "@inubekit/inubekit";

import { IUser } from "@ptypes/app.types";
import { mainNavigation } from "./routes/mainNavigation";
import { GlobalStyles } from "./styles/global";
import { AuthAndPortalDataProvider } from "./context/authAndPortalDataProvider";
import { ErrorPage } from "./design/layout/errorPage";
import { ChangeToRequestTabProvider } from "./context/changeToRequestTab";
import { ThemeProviderWrapper } from "./context/theme";
import { CreditLinesConstructionProvider } from "./context/creditLinesConstruction";
import { useAppData } from "./hooks/useAppData/index.ts";
import { AuthWrapper } from "./pages/authWrapper/index.tsx";
import { encrypt } from "./utils/crypto/encrypt";
import { IApp } from "./types/IApp/index";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const portalCode = params.get("portal");

function AppContent(props: IApp) {
  const { code, user, businessUnit } = props;
  if (portalCode && portalCode?.length > 0) {
    localStorage.setItem("portalCode", encrypt(portalCode));
  }

  const { hasError, isLoading, isAuthenticated, errorCode } = useAppData(
    code,
    user as IUser,
    businessUnit,
  );

  if (isLoading) {
    return null;
  }

  if (hasError && !isAuthenticated) {
    return <ErrorPage errorCode={errorCode} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <GlobalStyles />
      <ThemeProviderWrapper>
        <FlagProvider>
          <AuthAndPortalDataProvider>
            <ChangeToRequestTabProvider>
              <CreditLinesConstructionProvider>
                <RouterProvider router={mainNavigation} />
              </CreditLinesConstructionProvider>
            </ChangeToRequestTabProvider>
          </AuthAndPortalDataProvider>
        </FlagProvider>
      </ThemeProviderWrapper>
    </>
  );
}

function App(props: IApp) {
  return (
    <AuthWrapper>
      <AppContent {...props} />
    </AuthWrapper>
  );
}

export default App;
