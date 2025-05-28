import { EditRecord } from "@design/feedback/editRecord";
import { useEditDestinationConsultation } from "@hooks/moneyDestination/useEditDestinationConsultation";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IEdit {
  data: IEntry;
}

const Edit = (props: IEdit) => {
  const { data } = props;

  const { handleEdit } = useEditDestinationConsultation(data);
  return <EditRecord onEdit={handleEdit} />;
};

export { Edit };
