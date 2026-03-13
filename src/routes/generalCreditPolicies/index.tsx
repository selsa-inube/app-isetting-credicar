import { Route, Routes } from "react-router-dom";
import { GeneralCreditPolicies } from "@pages/generalCreditPolicies";
import { AddGenCreditPolicies } from "@pages/generalCreditPolicies/addGeneralCreditPolicies";
import { EditRequestGenPolicies } from "@pages/generalCreditPolicies/tabs/requestsInProgressTab/editRequestGenPolicies";

const GeneralCreditPoliciesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GeneralCreditPolicies />} />
      <Route
        path="add-general-credit-policies"
        element={<AddGenCreditPolicies />}
      />
      <Route
        path="edit-general-credit-policies/:option/:id/:requestNumber"
        element={<EditRequestGenPolicies />}
      />
    </Routes>
  );
};

export { GeneralCreditPoliciesRoutes };
