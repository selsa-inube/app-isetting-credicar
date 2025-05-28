import { useEffect, useState } from "react";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { formatDate } from "@utils/date/formatDate";
import { eventBus } from "@events/eventBus";
import { IEntry } from "@ptypes/design/table/IEntry";

const useDeleteDestination = (data: IEntry, appData: IAppData) => {
  const [showModal, setShowModal] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showPendingReq, setShowPendingReq] = useState(false);

  const [saveData, setSaveData] = useState<ISaveDataRequest>();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = () => {
    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: "Solicitud de eliminación de un destino de dinero",
      entityName: "MoneyDestination",
      requestDate: formatDate(new Date()),
      useCaseName: "DeleteMoneyDestination",
      configurationRequestData: {
        moneyDestinationId: data.id,
        abbreviatedName: data.name,
        removalJustification: `La eliminación del destino de dinero es solicitada por ${appData.user.userAccount}`,
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
    setShowPendingReq,
    handleToggleModal,
    handleClick,
    setShowRequestProcessModal,
    setShowModal,
  };
};
export { useDeleteDestination };
