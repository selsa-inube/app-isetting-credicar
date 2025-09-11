import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { deletedCycleMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/deletedCycleMessage";
import { deleteCyclePaymentModal } from "@config/payrollAgreement/payrollAgreementTab/generic/deleteCyclePaymentModal";
import { IUseDeleteCyclePayment } from "@ptypes/hooks/IUseDeleteCyclePayment";

const useDeleteCyclePayment = (props: IUseDeleteCyclePayment) => {
  const { data, setEntryDeleted } = props;
  const [showModal, setShowModal] = useState(false);
  const { addFlag } = useFlag();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = () => {
    setEntryDeleted(data.id);
    setShowModal(!showModal);
    addFlag({
      title: deletedCycleMessage.success.title,
      description: deletedCycleMessage.success.description,
      appearance: deletedCycleMessage.success.appearance as IFlagAppearance,
      duration: deletedCycleMessage.success.duration,
    });
  };

  const modalData = {
    title: deleteCyclePaymentModal.title,
    description: deleteCyclePaymentModal.description,
    actionText: deleteCyclePaymentModal.actionText,
    onCloseModal: handleToggleModal,
    onClick: handleClick,
    withCancelButton: false,
  };

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  return {
    showModal,
    modalData,
    handleToggleModal,
    handleClick,
    setShowModal,
  };
};

export { useDeleteCyclePayment };
