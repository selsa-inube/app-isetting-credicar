import { EditRecord } from "@design/feedback/editRecord";
import { useCreditLineRequestCons } from "@hooks/creditLine/useCreditLineRequestCons";
import { EManagementType } from "@enum/managementType";
import { IEditConstruction } from "@ptypes/creditLines/IEditConstruction";

const EditRequest = (props: IEditConstruction) => {
  const { data } = props;
  const { handleEdit, showInfoModal, modalData } = useCreditLineRequestCons({
    data,
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

export { EditRequest };
