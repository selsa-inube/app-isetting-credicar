import { useEffect, useState } from "react";
import { EUseCase } from "@enum/useCase";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { IUseDecisionTemplate } from "@ptypes/hooks/creditLines/IUseDecisionTemplate";

const useDecisionTemplate = (props: IUseDecisionTemplate) => {
  const {
    templateKey,
    ruleData,
    lineTypeDecision,
    useCaseConfiguration,
    ruleLoadding,
    loadingModify,
  } = props;

  const [showLineModal, setShowLineModal] = useState<boolean>(false);
  const [showAddDecisionModal, setShowAddDecisionModal] =
    useState<boolean>(false);
  const [componentLoading, setComponentLoading] = useState<boolean>(true);

  useEffect(() => {
    const isLoading =
      useCaseConfiguration === EUseCase.ADD ? loadingModify : ruleLoadding;

    if (isLoading) {
      setComponentLoading(true);
    } else {
      const timer = setTimeout(() => {
        setComponentLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [useCaseConfiguration, loadingModify, ruleLoadding]);

  const handleGoBack = () => {
    setShowLineModal(false);
  };

  const handleGoContinue = () => {
    setShowAddDecisionModal(true);
  };

  const formId = `credit-lines/${templateKey}`;

  const ruleLabel = `${ruleData.ruleName}`;
  const information = infoRulesMessage(lineTypeDecision);
  const message = String(
    information[ruleLabel as keyof typeof information] || information.Default,
  );

  const optionAddCreditline = useCaseConfiguration === EUseCase.ADD;

  return {
    formId,
    message,
    showLineModal,
    showAddDecisionModal,
    optionAddCreditline,
    componentLoading,
    setShowLineModal,
    handleGoBack,
    handleGoContinue,
  };
};

export { useDecisionTemplate };
