import { useNavigate } from "react-router-dom";
import { IEntry } from "@design/data/table/types";

const useEditDestinationConsultation = (data: IEntry) => {
  const navigate = useNavigate();

  const destinationData = {
    id: data.id,
    nameDestination: data.name,
    description: data.descriptionUse,
    icon: data.iconReference,
  };

  const handleEdit = () => {
    navigate(`/money-destination/edit-destination`, {
      state: { data: destinationData },
    });
  };

  return {
    handleEdit,
  };
};

export { useEditDestinationConsultation };
