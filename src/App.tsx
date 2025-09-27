import { RouterProvider } from "react-router-dom";
import { FlagProvider } from "@inubekit/inubekit";

import { IUser } from "@ptypes/app.types";
import { mainNavigation } from "./routes/mainNavigation";
import { useAppData } from "./hooks/useAppData";
import { GlobalStyles } from "./styles/global";
import { AuthAndPortalDataProvider } from "./context/authAndPortalDataProvider";
import { ErrorPage } from "./design/layout/errorPage";
import { ChangeToRequestTabProvider } from "./context/changeToRequestTab";
import { ThemeProviderWrapper } from "./context/theme";
import { CreditLinesConstructionProvider } from "./context/creditLinesConstruction";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const portalCode = params.get("portal");

interface IApp {
  code?: string;
  businessUnit?: string;
  user?: IUser;
}

function App(props: IApp) {
  const { code, user, businessUnit } = props;

  const { hasError, isLoading, isAuthenticated, errorCode } = useAppData(
    portalCode,
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

export default App;
