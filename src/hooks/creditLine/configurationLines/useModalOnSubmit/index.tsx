import { MdOutlineInfo, MdOutlineReportProblem } from "react-icons/md";
import { useEffect, useState } from "react";
import { EComponentAppearance } from "@enum/appearances";
import { submitRequestLabels } from "@config/creditLines/submitRequestLabels";
import { editSubmitRequestLabels } from "@config/creditLines/editSubmitRequestLabels";
import { IUseModalEditConfig } from "@ptypes/hooks/creditLines/IUseModalEditConfig";

const useModalOnSubmit = (props: IUseModalEditConfig) => {
  const {
    showConfigSubmitModal,
    showEditSubmitModal,
    unconfiguredRules,
    editedRules,
    onSaveModal,
    onEditSubmitModal,
    onToggleUnconfiguredRules,
    onUnconfiguredModal,
  } = props;

  const [showSendModal, setShowSendModal] = useState(false);
  useEffect(() => {
    const decision = showConfigSubmitModal || showEditSubmitModal;

    setShowSendModal(decision);
  }, [showEditSubmitModal, showConfigSubmitModal]);

  const submitModal = () => {
    const initial = {
      appearanceItemIcon: EComponentAppearance.DANGER,
      description: "",
      itemIcon: <MdOutlineInfo />,
      loading: false,
      title: "",
      unconfiguredRules: [],
      onClick: () => void 0,
      onCloseModal: () => void 0,
    };

    if (showConfigSubmitModal) {
      return {
        ...submitRequestLabels,
        onCloseModal: onToggleUnconfiguredRules,
        onClick: onUnconfiguredModal,
        unconfiguredRules: unconfiguredRules,
        appearanceItemIcon: EComponentAppearance.DANGER,
        loading: false,
        itemIcon: <MdOutlineInfo />,
      };
    }

    if (showEditSubmitModal) {
      return {
        ...editSubmitRequestLabels,
        onCloseModal: onEditSubmitModal,
        onClick: onSaveModal,
        unconfiguredRules: editedRules,
        appearanceItemIcon: EComponentAppearance.WARNING,
        loading: false,
        itemIcon: <MdOutlineReportProblem />,
      };
    }

    return initial;
  };

  const submitModalData = submitModal();

  return { submitModalData, showSendModal };
};

export { useModalOnSubmit };
