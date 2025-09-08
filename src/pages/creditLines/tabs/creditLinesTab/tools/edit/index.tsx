import { useEditCreditConsultation } from "@hooks/creditLine/edit/useEditCreditConsultation";
import { EditRecord } from "@design/feedback/editRecord";
import { ECreditLines } from "@enum/creditLines";
import { IEditCreditLine } from "@ptypes/creditLines/IEditCreditLine";

const Edit = (props: IEditCreditLine) => {
  const { data } = props;
  const { handleEdit, showInfoModal, handleToggleInfoModal } =
    useEditCreditConsultation({
      creditLineData: data,
      useCaseEdit: ECreditLines.USE_CASE_EDIT,
    });
  return (
    <>
      <EditRecord
        onEdit={handleEdit}
        showInfoModal={showInfoModal}
        onToggleInfoModal={handleToggleInfoModal}
      />
    </>
  );
};

export { Edit };
