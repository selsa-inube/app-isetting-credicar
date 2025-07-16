import { EditRecord } from "@design/feedback/editRecord";
import { useEditDestinationConsultation } from "@hooks/moneyDestination/useEditDestinationConsultation";
import { IEdit } from "@ptypes/moneyDestination/tabs/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;

  const { handleEdit } = useEditDestinationConsultation(data);
  return (
    <EditRecord
      onEdit={handleEdit}
      showInfoModal={false}
      onToggleInfoModal={() => void 0}
    />
  );
};

export { Edit };
