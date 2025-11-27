import { useEffect, useState } from "react";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { formatDate } from "@utils/date/formatDate";
import { eventBus } from "@events/eventBus";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { EModalState } from "@enum/modalState";
import { ERequestType } from "@enum/requestType";
import { EGeneral } from "@enum/general";
import { deletePayrollLabels } from "@config/payrollAgreement/payrollAgreementTab/deletePayrollLabels";
import { IUseDeletePayroll } from "@ptypes/hooks/IUseDeletePayroll";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const useDeletePayroll = (props: IUseDeletePayroll) => {
  const { data, appData } = props;
  const [showModal, setShowModal] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showPendingReq, setShowPendingReq] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: EPayrollAgreement.USE_CASE_DELETE,
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
      description: deletePayrollLabels.descriptionSaveData,
      entityName: "PayrollAgreement",
      requestDate: formatDate(new Date()),
      useCaseName: EPayrollAgreement.USE_CASE_DELETE,
      configurationRequestData: {
        abbreviatedName: data.abbreviatedName,
        payrollForDeductionAgreementId: data.payrollForDeductionAgreementId,
        payrollForDeductionAgreementCode: data.payrollForDeductionAgreementCode,
        numberOfDaysForReceivingTheDiscounts: Number(
          data.numberOfDaysForReceivingTheDiscounts,
        ),
        payrollForDeductionAgreementType: data.payrollForDeductionAgreementType,
        removalJustification: `${deletePayrollLabels.removalJustification} ${appData.user.userAccount}`,
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
export { useDeletePayroll };
