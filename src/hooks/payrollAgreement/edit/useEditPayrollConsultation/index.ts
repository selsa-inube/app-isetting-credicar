import { useNavigate } from "react-router-dom";
import { IUseEditPayrollConsultation } from "@ptypes/hooks/IUseEditPayrollConsultation";

const useEditPayrollConsultation = (props: IUseEditPayrollConsultation) => {
  const { payrollAgreementData } = props;
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!payrollAgreementData) {
      console.error("payrollAgreementData is undefined or null");
      return;
    }

    navigate(`/payroll-agreement/edit-payroll`, {
      state: { data: payrollAgreementData },
    });
  };

  return {
    handleEdit,
  };
};

export { useEditPayrollConsultation };
