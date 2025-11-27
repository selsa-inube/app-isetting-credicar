import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { ECreditLines } from "@enum/creditLines";
import { EUseCase } from "@enum/useCase";
import { removeDeleteTransactions } from "@utils/removeDeleteTransactions";
import { mediaQueryTablet } from "@config/environment";
import { detailsRequestModal } from "@config/creditLines/generic/detailsRequestModal";
import { deleteUseCaseLabels } from "@config/creditLines/requestInProgressTab/deleteUseCaseLabels";
import { IUseDetailsRequest } from "@ptypes/hooks/creditLines/IUseDetailsRequest";
import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";

const useDetailsRequest = (props: IUseDetailsRequest) => {
  const { configurationData, useNameRequest } = props;
  const { setFilterRules } = useContext(CreditLinesConstruction);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (configurationData?.configurationRequestData) {
      if (useNameRequest === ECreditLines.USE_CASE_DELETE) {
        setShowModal(true);
      } else {
        const filterData = configurationData.configurationRequestData.rules
          .map((item: IDecisionsByRule) => item.ruleName)
          .filter((item: IDecisionsByRule) => item !== undefined);
        const removeDeleteTransOperation =
          removeDeleteTransactions(configurationData);
        setFilterRules(filterData);
        navigate(`/credit-lines/edit-credit-lines`, {
          state: { data: removeDeleteTransOperation, option: EUseCase.DETAILS },
        });
      }
    }
  }, [configurationData, useNameRequest]);

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
        description: deleteUseCaseLabels(
          configurationData.configurationRequestData.abbreviatedName,
        ).description,
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
