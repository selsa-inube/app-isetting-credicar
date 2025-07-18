import { useEditPayrollConsultation } from "@hooks/payrollAgreement/edit/useEditPayrollConsultation";
import { EditRecord } from "@design/feedback/editRecord";
import { IEdit } from "@ptypes/payrollAgreement/payrollAgreementTab/IEdit";

const Edit = (props: IEdit) => {
  const { data, useCaseEdit } = props;
  const { handleEdit, showInfoModal, handleToggleInfoModal } =
    useEditPayrollConsultation({
      payrollAgreementData: data,
      useCaseEdit,
    });
  return (
    <>
      <EditRecord
        onEdit={handleEdit}
        showInfoModal={showInfoModal}
        onToggleInfoModal={handleToggleInfoModal}
      />
    </>
  );
};

export { Edit };
