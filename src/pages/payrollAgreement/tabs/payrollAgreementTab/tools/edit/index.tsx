import { useEditPayrollConsultation } from "@hooks/payrollAgreement/edit/useEditPayrollConsultation";
import { EManagementType } from "@enum/managementType";
import { EditRecord } from "@design/feedback/editRecord";
import { IEdit } from "@ptypes/payrollAgreement/payrollAgreementTab/IEdit";

const Edit = (props: IEdit) => {
  const { data, useCaseEdit } = props;
  const { handleEdit, showInfoModal, modalData } = useEditPayrollConsultation({
    payrollAgreementData: data,
    useCaseEdit: useCaseEdit as string,
    option: EManagementType.CURRENT,
  });
  return (
    <>
      <EditRecord
        onEdit={handleEdit}
        showInfoModal={showInfoModal}
        modalData={modalData}
      />
    </>
  );
};

export { Edit };
