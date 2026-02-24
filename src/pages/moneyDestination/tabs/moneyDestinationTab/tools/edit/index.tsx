import { EditRecord } from "@design/feedback/editRecord";
import { useEditDestinationConsultation } from "@hooks/moneyDestination/edit/useEditDestinationConsultation";
import { EMoneyDestination } from "@enum/moneyDestination";
import { EManagementType } from "@enum/managementType";
import { IEdit } from "@ptypes/moneyDestination/tabs/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;

  const { handleEdit, showInfoModal, modalData } =
    useEditDestinationConsultation({
      data,
      useCase: EMoneyDestination.USE_CASE_EDIT,
      option: EManagementType.CURRENT,
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
