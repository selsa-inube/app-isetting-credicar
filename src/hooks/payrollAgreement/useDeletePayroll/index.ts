import { useEffect, useState } from "react";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { formatDate } from "@utils/date/formatDate";
import { eventBus } from "@events/eventBus";
import { IUseDeletePayroll } from "@ptypes/hooks/IUseDeletePayroll";

const useDeletePayroll = (props: IUseDeletePayroll) => {
  const { data, appData } = props;
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
      description: "Solicitud de eliminación de una nomina de convenio",
      entityName: "PayrollAgreement",
      requestDate: formatDate(new Date()),
      useCaseName: "DeletePayrollAgreement",
      configurationRequestData: {
        abbreviatedName: data.abbreviatedName,
        numberOfDaysForReceivingTheDiscounts:
          data.numberOfDaysForReceivingTheDiscounts,
        payrollForDeductionAgreementType: data.payrollForDeductionAgreementType,
        justification: `La eliminación de la nomina de convenio es solicitada por ${appData.user.userAccount}`,
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
export { useDeletePayroll };
