import { EditRecord } from "@design/feedback/editRecord";
import { useEditDestRequestConsultation } from "@hooks/moneyDestination/useEditDestRequestConsultation";
import { EManagementType } from "@enum/managementType";
import { EMoneyDestination } from "@enum/moneyDestination";
import { IEdit } from "@ptypes/moneyDestination/tabs/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;

  const { handleEdit, showInfoModal, modalData } =
    useEditDestRequestConsultation({
      data,
      useCase: EMoneyDestination.USE_CASE_EDIT,
      option: EManagementType.IN_PROGRESS,
    });
  return (
    <EditRecord
      onEdit={handleEdit}
      showInfoModal={showInfoModal}
      modalData={modalData}
    />
  );
};

export { Edit };
