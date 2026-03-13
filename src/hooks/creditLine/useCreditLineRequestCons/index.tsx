import { useNavigate } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EUseCase } from "@enum/useCase";
import { ERequestType } from "@enum/requestType";
import { EComponentAppearance } from "@enum/appearances";
import { getResponsible } from "@utils/getResponsible";
import { userResponsibleModal } from "@config/userResponsibleModal";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUseCreditLineRequestCons } from "@ptypes/hooks/creditLines/IUseCreditLineRequestCons";

const useCreditLineRequestCons = (props: IUseCreditLineRequestCons) => {
  const { data, option } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const optionUseCase = EUseCase.ADD;
  const navigate = useNavigate();

  const validateResponsible = useMemo(() => {
    return getResponsible(
      data as IRequestsInProgress,
      appData.user.userAccount,
    );
  }, [
    data.userManagingConfigurationRequests,
    data.requester,
    appData.user.userAccount,
  ]);

  const handleEdit = () => {
    if (data.requestType !== ERequestType.ADD || !validateResponsible) {
      setShowInfoModal(true);
      return;
    }

    navigate(
      `/credit-lines/edit-credit-lines/${optionUseCase}/${option}/${data.id}`,
    );
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
        ...userResponsibleModal(data.requestType === ERequestType.ADD),
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

export { useCreditLineRequestCons };
