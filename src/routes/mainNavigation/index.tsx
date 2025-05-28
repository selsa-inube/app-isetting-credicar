import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { SelectBusinessUnitsRoutes } from "@routes/selectBusinessunits";
import { CreditLinesRoutes } from "@routes/creditLines";
import { MoneyDestinationRoutes } from "@routes/moneyDestination";

import { ErrorPage } from "@design/layout/errorPage";
import { Logout } from "@pages/login/logout";
import { AppPage } from "@design/layout/appPage";
import { Landing } from "@pages/home/landing";
import { GeneralCreditPoliciesRoutes } from "../generalCreditPolicies";
import { PayrollAgreementRoutes } from "../payrollAgreement";

const mainNavigation = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="selectBusinessUnit/*"
        element={<SelectBusinessUnitsRoutes />}
      />
      <Route
        path="/"
        element={<Landing />}
        errorElement={<ErrorPage errorCode={1005} />}
      />
      <Route path="/" element={<AppPage />}>
        <Route path="credit-lines/*" element={<CreditLinesRoutes />} />
        <Route
          path="money-destination/*"
          element={<MoneyDestinationRoutes />}
        />

        <Route
          path="payroll-agreement/*"
          element={<PayrollAgreementRoutes />}
        />
        <Route
          path="general-credit-policies/*"
          element={<GeneralCreditPoliciesRoutes />}
        />
      </Route>
      <Route path="logout" element={<Logout />} />
    </>,
  ),
);

export { mainNavigation };
