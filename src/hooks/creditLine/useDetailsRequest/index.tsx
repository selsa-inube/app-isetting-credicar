import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { ECreditLines } from "@enum/creditLines";
import { EUseCase } from "@enum/useCase";
import { mediaQueryTablet } from "@config/environment";
import { detailsRequestModal } from "@config/creditLines/generic/detailsRequestModal";
import { IUseDetailsRequest } from "@ptypes/hooks/creditLines/IUseDetailsRequest";

const useDetailsRequest = (props: IUseDetailsRequest) => {
  const { configurationData, useNameRequest } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (configurationData) {
      if (useNameRequest !== ECreditLines.USE_CASE_NAME_ADD) {
        setShowModal(true);
      } else {
        navigate(`/credit-lines/edit-credit-lines`, {
          state: { data: configurationData, option: EUseCase.DETAILS },
        });
      }
    }
  }, [useNameRequest]);

  const screenTablet = useMediaQuery(mediaQueryTablet);

  const handleToggleModal = () => {
    setShowModal(false);
  };

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
    };

    if (showModal) {
      return {
        ...detailsRequestModal,
        onCloseModal: handleToggleModal,
        onClick: handleToggleModal,
        withCancelButton: false,
        withIcon: true,
        description: configurationData.modifyJustification,
      };
    }
    return initial;
  };

  const modalData = modal();

  return {
    screenTablet,
    modalData,
    showModal,
    handleToggleModal,
  };
};

export { useDetailsRequest };
