import { useEditPayrollRequestCons } from "@hooks/payrollAgreement/useEditPayrollRequestCons";
import { EditRecord } from "@design/feedback/editRecord";
import { EManagementType } from "@enum/managementType";
import { IEdit } from "@ptypes/payrollAgreement/payrollAgreementTab/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;
  const { handleEdit, showInfoModal, modalData } = useEditPayrollRequestCons({
    payrollAgreementData: data,
    option: EManagementType.IN_PROGRESS,
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
