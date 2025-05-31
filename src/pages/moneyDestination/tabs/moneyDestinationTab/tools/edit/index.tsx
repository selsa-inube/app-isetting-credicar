import { EditRecord } from "@design/feedback/editRecord";
import { useEditDestinationConsultation } from "@hooks/moneyDestination/useEditDestinationConsultation";
import { IEdit } from "@src/types/moneyDestination/tabs/IEdit";

const Edit = (props: IEdit) => {
  const { data } = props;

  const { handleEdit } = useEditDestinationConsultation(data);
  return <EditRecord onEdit={handleEdit} />;
};

export { Edit };
