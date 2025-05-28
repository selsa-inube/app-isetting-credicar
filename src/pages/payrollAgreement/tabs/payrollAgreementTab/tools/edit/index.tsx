import { useEditPayrollConsultation } from "@hooks/payrollAgreement/edit/useEditPayrollConsultation";
import { EditRecord } from "@design/feedback/editRecord";
import { IEdit } from "@ptypes/payrollAgreement/payrollAgreementTab/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;
  const { handleEdit } = useEditPayrollConsultation({
    payrollAgreementData: data,
  });
  return <EditRecord onEdit={handleEdit} />;
};

export { Edit };
