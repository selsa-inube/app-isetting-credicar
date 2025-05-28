import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.tsx";
import { enviroment } from "@config/environment";
import { AuthAndPortalDataProvider } from "@context/authAndPortalDataProvider/index.tsx";

import { I18nextProvider } from "react-i18next";
import { i18next } from "./utils/i18n/index.ts";

const redirect_uri = window.location.origin;

// const pruebauser = {
//   email: "angiepinillanova@gmail.com",
//   email_verified: true,
//   family_name: "pinilla nova",
//   given_name: "angie",
//   name: "angie pinilla nova",
//   nickname: "angiepinillanova",
//   picture:
//     "https://lh3.googleusercontent.com/a/ACg8ocKmxazU01okYO_cctPDDKnUX-k_UN60Ayjb1zMuDp8xnNb4Afrr=s96-c",
//   sub: "google-oauth2|114859487757017350144",
//   updated_at: "2024-12-02T19:44:20.603Z",
// };

// const pruebabusiness = JSON.stringify({
//   publicCode: "test",
//   languageId: "esp",
//   abbreviatedName: "test",
//   descriptionUse: "test",
//   firstMonthOfFiscalYear: "JAN",
//   urlLogo: "http://www.sistemasenlinea.com.co/images/nuevo-logo-linix.png",
// });

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={enviroment.AUTH0_DOMAIN}
      clientId={enviroment.CLIENT_ID}
      authorizationParams={{
        redirect_uri,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <AuthAndPortalDataProvider>
        {/* <App
          user={pruebauser}
          businessUnit={pruebabusiness}
          code={"J4EE6aa6pSNoNsIbZhlk6w=="}
        /> */}
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </AuthAndPortalDataProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
