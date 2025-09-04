import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { IUseDetailsCreditLine } from "@ptypes/hooks/creditLines/IUseDetailsCreditLine";

const useDetailsCreditLine = (props: IUseDetailsCreditLine) => {
  const { data } = props;

  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery(mediaQueryMobile);

  const normalizeData = {
    id: data.id,
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const screenTablet = useMediaQuery(mediaQueryTablet);

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
    normalizeData,
    isMobile,
    screenTablet,
    handleToggleModal,
  };
};

export { useDetailsCreditLine };
