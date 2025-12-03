import { useEffect, useState } from "react";
import { MdOutlineReportProblem } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";
import { disabledModal } from "@config/disabledModal";
import { notPoliciesModal } from "@config/generalCreditPolicies/assisted/goBackModal";
import { withoutDataModal } from "@config/generalCreditPolicies/assisted/withoutDataModal";
import { goBackModal } from "@config/goBackModal";
import { IUseModalGeneralCreditPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseModalGeneralCreditPolicies";

const useModalGeneralCreditPolicies = (
  props: IUseModalGeneralCreditPolicies,
) => {
  const {
    emptyData,
    withoutPrivilegesAdd,
    showAddPolicies,
    showGoBackModal,
    defaultSelectedTab,
    handleEmptyData,
    handleCloseModal,
    handlePolicies,
    handleCloseGoBackModal,
    handleGoBack,
  } = props;
  const [showDecision, setShowDecision] = useState(false);

  useEffect(() => {
    const decision = emptyData || showAddPolicies || showGoBackModal;
    setShowDecision(decision);
  }, [emptyData, showAddPolicies, showGoBackModal]);

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

    if (withoutPrivilegesAdd && showAddPolicies) {
      return {
        ...disabledModal,
        withCancelButton: false,
        withIcon: false,
        icon: <></>,
        onCloseModal: handleCloseModal,
        onClick: handleCloseModal,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (!withoutPrivilegesAdd && showAddPolicies) {
      return {
        ...notPoliciesModal,
        withCancelButton: true,
        withIcon: false,
        icon: <></>,
        onCloseModal: handleCloseModal,
        onClick: handlePolicies,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (
      !withoutPrivilegesAdd &&
      !showAddPolicies &&
      defaultSelectedTab === undefined
    ) {
      return {
        ...withoutDataModal,
        onCloseModal: handleEmptyData,
        onClick: handleEmptyData,
        withCancelButton: false,
        withIcon: true,
        icon: <MdOutlineReportProblem />,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showGoBackModal) {
      return {
        ...goBackModal,
        onCloseModal: handleCloseGoBackModal,
        onClick: handleGoBack,
        withCancelButton: true,
        withIcon: false,
        icon: <></>,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();

  return {
    modalData,
    showDecision,
  };
};

export { useModalGeneralCreditPolicies };
