import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EComponentAppearance } from "@enum/appearances";
import { ERequestType } from "@enum/requestType";
import { userResponsibleModal } from "@config/userResponsibleModal";
import { IUseEditDestinationConsult } from "@ptypes/hooks/IUseEditDestinationConsult";
import { IUserManagingConfigRequests } from "@ptypes/requestInProgress/IUserConfigRequests";
import { IApplicantData } from "@ptypes/requestInProgress/IApplicantData";

const useEditDestRequestConsultation = (props: IUseEditDestinationConsult) => {
  const { data, option } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const responsible = () => {
    const usermanaments: string[] = [];

    const userManagements = data.usermanamentsConfigurationrequest as
      | IUserManagingConfigRequests[]
      | undefined;
    const applicants = data.applicantData as IApplicantData[] | undefined;

    if (Array.isArray(userManagements)) {
      userManagements.forEach((user) =>
        usermanaments.push(user.userResponsible),
      );
    }

    if (Array.isArray(applicants)) {
      applicants.forEach((applicant) => usermanaments.push(applicant.name));
    }

    return usermanaments.includes(appData.user.userAccount);
  };

  const validateResponsible = useMemo(() => {
    if (!data.usermanamentsConfigurationrequest && !data.applicantData)
      return false;
    return responsible();
  }, [
    data.usermanamentsConfigurationrequest,
    data.applicantData,
    appData.user.userAccount,
  ]);

  const handleEdit = () => {
    if (data.requestType !== ERequestType.ADD && !validateResponsible) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!data) {
        console.error("destination data is undefined or null");
        return;
      }

      navigate(
        `/money-destination/edit-destination/${option}/${data.id}/${data.requestNumber}`,
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
        ...userResponsibleModal,
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

export { useEditDestRequestConsultation };
