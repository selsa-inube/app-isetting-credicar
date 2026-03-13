import { useNavigate } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EComponentAppearance } from "@enum/appearances";
import { ERequestType } from "@enum/requestType";
import { getResponsible } from "@utils/getResponsible";
import { userResponsibleModal } from "@config/userResponsibleModal";
import { IUseEditPayrollConsultation } from "@ptypes/hooks/IUseEditPayrollConsultation";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

const useEditPayrollRequestCons = (props: IUseEditPayrollConsultation) => {
  const { payrollAgreementData, option, requestType } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateResponsible = useMemo(() => {
    if (
      !payrollAgreementData.requester &&
      !payrollAgreementData.userManagingConfigurationRequests
    )
      return false;
    return getResponsible(
      payrollAgreementData as IRequestsInProgress,
      appData.user.userAccount,
    );
  }, [
    payrollAgreementData.usermanamentsConfigurationrequest,
    payrollAgreementData.requester,
    appData.user.userAccount,
  ]);

  const handleEdit = () => {
    if (
      payrollAgreementData.requestType !== ERequestType.ADD &&
      !validateResponsible
    ) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!payrollAgreementData) {
        console.error("payrollAgreementData is undefined or null");
        return;
      }

      navigate(
        `/payroll-agreement/edit-payroll/${option}/${payrollAgreementData.id}/${payrollAgreementData.requestNumber}`,
      );
    }
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };
  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (showInfoModal) {
      return {
        ...userResponsibleModal(requestType === ERequestType.ADD),
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();
  return {
    handleEdit,
    showInfoModal,
    modalData,
    handleToggleInfoModal,
  };
};

export { useEditPayrollRequestCons };
