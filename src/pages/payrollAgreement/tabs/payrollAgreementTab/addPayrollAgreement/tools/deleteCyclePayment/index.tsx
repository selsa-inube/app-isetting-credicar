import { useDeleteCyclePayment } from "@hooks/payrollAgreement/useDeleteCyclePayment";
import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { IDeleteCyclePayment } from "@ptypes/payrollAgreement/payrollAgreementTab/IDeleteCyclePayment";

const DeleteCyclePayment = (props: IDeleteCyclePayment) => {
  const { data, setEntryDeleted } = props;

  const { showModal, modalData, handleToggleModal } = useDeleteCyclePayment({
    data,
    setEntryDeleted,
  });

  return (
    <DeleteRecord
      modalData={modalData}
      showDecision={showModal}
      onToggleModal={handleToggleModal}
      loading={false}
      withActionMobile={false}
    />
  );
};

export { DeleteCyclePayment };
