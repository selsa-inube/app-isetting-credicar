import { DeleteRecord } from "@design/feedback/DeleteRecord";

import { useDeleteCyclePayment } from "@hooks/payrollAgreement/useDeleteCyclePayment";
import { deleteCyclePaymentModal } from "@config/payrollAgreement/payrollAgreementTab/generic/deleteCyclePaymentModal";
import { IDeleteCyclePayment } from "@ptypes/payrollAgreement/payrollAgreementTab/IDeleteCyclePayment";

const DeleteCyclePayment = (props: IDeleteCyclePayment) => {
  const { data, setEntryDeleted } = props;

  const { showModal, handleToggleModal, handleClick } = useDeleteCyclePayment({
    data,
    setEntryDeleted,
  });

  return (
    <DeleteRecord
      messageDelete={deleteCyclePaymentModal}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      onClick={handleClick}
      loading={false}
      withActionMobile={false}
      showInfoModal={false}
      onToggleInfoModal={() => void 0}
    />
  );
};

export { DeleteCyclePayment };
