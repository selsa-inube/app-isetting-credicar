import { useEffect, useState } from "react";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { EComponentAppearance } from "@enum/appearances";
import { errorModal } from "@config/errorModal";
import { withoutDataModal } from "@config/withoutData";
import { IUseModalConfigurationInitial } from "@ptypes/hooks/creditLines/IUseModalConfigurationInitial";

const useModalConfigurationInitial = (props: IUseModalConfigurationInitial) => {
  const {
    errorData,
    showErrorModal,
    showErrorRulesModal,
    loadingGroupRules,
    loading,
    data,
    showWithoutDataModal,
    withoutData,
    hasError,
    hasErrorAllRules,
    hasErrorGroupRules,
    loadingAllRules,
    errorDataGroupRules,
    handleToggleErrorModal,
    handleToggleWithouDataModal,
    handleToggleErrorRulesModal,
  } = props;

  const [showDecision, setShowDecision] = useState<boolean>(false);

  useEffect(() => {
    const decision =
      showErrorModal ||
      showWithoutDataModal ||
      hasError ||
      hasErrorAllRules ||
      showErrorRulesModal ||
      withoutData ||
      hasErrorGroupRules;
    setShowDecision(decision);
  }, [
    showErrorModal,
    showWithoutDataModal,
    hasError,
    hasErrorAllRules,
    hasErrorGroupRules,
  ]);

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

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (!loadingAllRules && hasErrorAllRules) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleErrorRulesModal,
        onClick: handleToggleErrorRulesModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (!loadingGroupRules && hasErrorGroupRules) {
      return {
        ...errorModal(
          messageErrorStatusConsultation(errorDataGroupRules.status),
        ),
        onCloseModal: handleToggleErrorRulesModal,
        onClick: handleToggleErrorRulesModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (data === undefined && !hasErrorAllRules) {
      return {
        ...withoutDataModal,
        onCloseModal: handleToggleWithouDataModal,
        onClick: handleToggleWithouDataModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalConfigurationInitial };
