import { Route, Routes } from "react-router-dom";

import { CreditLines } from "@pages/creditLines";
import { ConfigurationLines } from "@pages/creditLines/tabs/configurationLines";
import { ClientsSupportLineForm } from "@pages/creditLines/tabs/forms/clientsSupportLineForm";
import { NameAndDescriptionForm } from "@pages/creditLines/tabs/forms/nameAndDescriptionForm";
import { DecisionTemplateScreen } from "@pages/creditLines/tabs/forms/DecisionTemplateScreen";

const CreditLinesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CreditLines />} />
      <Route path="edit-credit-lines" element={<ConfigurationLines />}>
        <Route index element={<NameAndDescriptionForm />} />
        <Route path="clients-supported" element={<ClientsSupportLineForm />} />
        <Route
          path="line-Names-Descriptions"
          element={<NameAndDescriptionForm />}
        />
        <Route path="loan-term" element={<DecisionTemplateScreen templateKey="loan-term" />}  />
        <Route path="amortization-methods" element={<></>} />
        <Route path="rate-increase" element={<></>} />
        <Route path="increment-value" element={<></>} />
        <Route path="disbursement-methods" element={<></>} />
        <Route path="suggested-payment-channel" element={<></>} />
        <Route path="percentage-requested-amount" element={<></>} />
        <Route path="grace-period" element={<></>} />
        <Route path="payment-channel-extraInstallments" element={<></>} />
        <Route path="adjustment-interest-payment-type" element={<></>} />
        <Route path="line-credit" element={<></>} />
        <Route path="channels-credit-by-Line" element={<></>} />
        <Route path="loan-amount-limit" element={<></>} />
        <Route path="maximum-percentage-extraordinary" element={<></>} />
        <Route path="percentage-available-monthly-payment" element={<></>} />
        <Route path="lines-not-subtracted-analysis" element={<></>} />
        <Route path="interest-rate-type" element={<></>} />
        <Route path="interest-rate-fixed-points" element={<></>} />
        <Route path="reference-rate-fixed-points" element={<></>} />
        <Route path="credit-risk-premium" element={<></>} />
        <Route path="fixed-interest-rate" element={<></>} />
        <Route
          path="monthly-remuneration-rate-other-expenses"
          element={<></>}
        />
        <Route path="approval-board-positions" element={<></>} />
        <Route path="indicator-automatic-manual-approval" element={<></>} />
        <Route path="positions-authorized-approve" element={<></>} />
        <Route path="has-atomatic-collection" element={<></>} />
        <Route path="exclusive-credit-lines" element={<></>} />
        <Route path="positions-authorized-extemporaneous" element={<></>} />
        <Route path="omittable-human-tasks" element={<></>} />
        <Route path="automatic-collection-exclusive-lines" element={<></>} />
        <Route path="estimated-days-loan-disbursement" element={<></>} />
        <Route path="allows-collect-other-products" element={<></>} />
        <Route path="financial-obligations-update-required" element={<></>} />
        <Route path="guarantee-requirements" element={<></>} />
        <Route path="additional-borrowers-allowed" element={<></>} />
        <Route path="bond-calculation-factor-amount" element={<></>} />
        <Route path="requirement" element={<></>} />
      </Route>
    </Routes>
  );
};

export { CreditLinesRoutes };
