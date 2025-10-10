import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { EUseCase } from "@enum/useCase";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { IUseDetailsCreditLine } from "@ptypes/hooks/creditLines/IUseDetailsCreditLine";

const useDetailsCreditLine = (props: IUseDetailsCreditLine) => {
  const { data } = props;

  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery(mediaQueryMobile);
  const screenTablet = useMediaQuery(mediaQueryTablet);
  const navigate = useNavigate();

  const normalizeData = {
    id: data.id,
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleConfiguration = () => {
    if (!data) {
      console.error("Data is undefined or null");
      return;
    }

    navigate(`/credit-lines/edit-credit-lines`, {
      state: { data: data, option: EUseCase.DETAILS_CONDITIONAL },
    });
  };

  useEffect(() => {
    const emitEvent = (eventName: string) => {
      eventBus.emit(eventName, showModal);
    };
    if (showModal) {
      emitEvent(EModalState.SECOND_MODAL_STATE);
    }
  }, [showModal]);

  return {
    showModal,
    handleConfiguration,
    normalizeData,
    isMobile,
    screenTablet,
    handleToggleModal,
  };
};

export { useDetailsCreditLine };
