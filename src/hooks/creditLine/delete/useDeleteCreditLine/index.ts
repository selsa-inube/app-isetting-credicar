import { useEffect, useState } from "react";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { formatDate } from "@utils/date/formatDate";
import { eventBus } from "@events/eventBus";
import { EGeneral } from "@enum/general";
import { ECreditLines } from "@enum/creditLines";
import { ERequestType } from "@enum/requestType";
import { EModalState } from "@enum/modalState";
import { deleteCreditLabels } from "@config/creditLines/creditLinesTab/generic/deleteCreditLabels";
import { IUseDeletePayroll } from "@ptypes/hooks/IUseDeletePayroll";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const useDeleteCreditLine = (props: IUseDeletePayroll) => {
  const { data, appData } = props;
  const [showModal, setShowModal] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showPendingReq, setShowPendingReq] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: ECreditLines.USE_CASE_DELETE,
  });

  const [saveData, setSaveData] = useState<ISaveDataRequest>();

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
      applicationName: EGeneral.APPLICATION_NAME,
      requestType: ERequestType.REMOVE,
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: deleteCreditLabels.descriptionSaveData,
      entityName: "CreditLine",
      requestDate: formatDate(new Date()),
      useCaseName: ECreditLines.USE_CASE_DELETE,
      configurationRequestData: {
        ...data,
        removalJustification: `${deleteCreditLabels.removalJustification} ${data.id}`,
      },
    });
    setShowRequestProcessModal(true);
  };

  useEffect(() => {
    const emitEvent = (eventName: string) => {
      eventBus.emit(eventName, showModal);
    };

    if (showModal && !showRequestProcessModal) {
      emitEvent(EModalState.SECOND_MODAL_STATE);
    } else if (!showModal && !showRequestProcessModal && !showPendingReq) {
      emitEvent(EModalState.SECOND_MODAL_STATE);
    } else if (!showModal && showRequestProcessModal) {
      emitEvent(EModalState.THIRD_MODAL_STATE);
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
export { useDeleteCreditLine };
