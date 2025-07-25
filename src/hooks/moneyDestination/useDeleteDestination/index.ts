import { useEffect, useState } from "react";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { formatDate } from "@utils/date/formatDate";
import { eventBus } from "@events/eventBus";
import { EMoneyDestination } from "@enum/moneyDestination";
import { deleteDestinationLabels } from "@config/moneyDestination/deleteDestination/deleteDestinationLabels";
import { IUseDeleteDestination } from "@ptypes/hooks/moneyDestination/IUseDeleteDestination";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const useDeleteDestination = (props: IUseDeleteDestination) => {
  const { data, appData } = props;
  const [showModal, setShowModal] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showPendingReq, setShowPendingReq] = useState(false);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: EMoneyDestination.USE_CASE_DELETE,
  });

  const handleToggleModal = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      setShowModal(!showModal);
    }
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const handleClick = () => {
    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: deleteDestinationLabels.descriptionSave,
      entityName: "MoneyDestination",
      requestDate: formatDate(new Date()),
      useCaseName: EMoneyDestination.USE_CASE_NAME_DELETE,
      configurationRequestData: {
        moneyDestinationId: data.id,
        abbreviatedName: data.name,
        removalJustification: `${deleteDestinationLabels.removalJustification} ${appData.user.userAccount}`,
      },
    });
    setShowRequestProcessModal(true);
  };

  useEffect(() => {
    const emitEvent = (eventName: string) => {
      eventBus.emit(eventName, showModal);
    };

    if (showModal && !showRequestProcessModal) {
      emitEvent("secondModalState");
    } else if (!showModal && !showRequestProcessModal && !showPendingReq) {
      emitEvent("secondModalState");
    } else if (!showModal && showRequestProcessModal) {
      emitEvent("thirdModalState");
    }
  }, [showModal, showRequestProcessModal, showPendingReq]);

  return {
    showModal,
    saveData,
    showRequestProcessModal,
    showInfoModal,
    handleToggleInfoModal,
    setShowPendingReq,
    handleToggleModal,
    handleClick,
    setShowRequestProcessModal,
    setShowModal,
  };
};
export { useDeleteDestination };
