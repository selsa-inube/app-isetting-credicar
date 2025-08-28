import { EditRecord } from "@design/feedback/editRecord";
import { useEditDestinationConsultation } from "@hooks/moneyDestination/edit/useEditDestinationConsultation";
import { EMoneyDestination } from "@enum/moneyDestination";
import { IEdit } from "@ptypes/moneyDestination/tabs/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;

  const { handleEdit, showInfoModal, handleToggleInfoModal } =
    useEditDestinationConsultation({
      data,
      useCase: EMoneyDestination.USE_CASE_EDIT,
    });
  return (
    <EditRecord
      onEdit={handleEdit}
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
    />
  );
};

export { Edit };
