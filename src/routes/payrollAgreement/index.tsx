import { Route, Routes } from "react-router-dom";
import { PayrollAgreement } from "@pages/payrollAgreement";
import { AddPayrollAgreement } from "@pages/payrollAgreement/tabs/payrollAgreementTab/addPayrollAgreement";
import { EditPayrollAgreement } from "@pages/payrollAgreement/tabs/payrollAgreementTab/editPayrollAgreement";

const PayrollAgreementRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PayrollAgreement />} />
      <Route path="add-payroll-agreement" element={<AddPayrollAgreement />} />
      <Route
        path="edit-payroll/:option/:id/:requestNumber"
        element={<EditPayrollAgreement />}
      />
      <Route path="edit-payroll/:option" element={<EditPayrollAgreement />} />
    </Routes>
  );
};

export { PayrollAgreementRoutes };
