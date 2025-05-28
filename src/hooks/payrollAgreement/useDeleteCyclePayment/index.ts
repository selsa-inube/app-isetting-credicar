import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";
import { deletedCycleMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/deletedCycleMessage";
import { IUseDeleteCyclePayment } from "@ptypes/hooks/IUseDeleteCyclePayment";
import { eventBus } from "@events/eventBus";

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

  useEffect(() => {
    eventBus.emit("secondModalState", showModal);
  }, [showModal]);

  return {
    showModal,
    handleToggleModal,
    handleClick,
    setShowModal,
  };
};

export { useDeleteCyclePayment };
