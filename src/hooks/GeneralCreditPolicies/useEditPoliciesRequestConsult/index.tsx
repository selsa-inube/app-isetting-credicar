import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EComponentAppearance } from "@enum/appearances";
import { ERequestType } from "@enum/requestType";
import { userResponsibleModal } from "@config/userResponsibleModal";
import { IUseEditDestinationConsult } from "@ptypes/hooks/IUseEditDestinationConsult";
import { getResponsible } from "@utils/getResponsible";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

const useEditPoliciesRequestConsult = (props: IUseEditDestinationConsult) => {
  const { data, option } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

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
    } else {
      if (!data) {
        console.error("policies data is undefined or null");
        return;
      }

      navigate(
        `/general-credit-policies/edit-general-credit-policies/${option}/${data.id}/${data.requestNumber}`,
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
    showInfoModal,
    modalData,
    handleToggleInfoModal,
    handleEdit,
  };
};

export { useEditPoliciesRequestConsult };
