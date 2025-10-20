import { useState } from "react";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { IUseDecisionTemplate } from "@ptypes/hooks/creditLines/IUseDecisionTemplate";

const useDecisionTemplate = (props: IUseDecisionTemplate) => {
  const { templateKey, ruleData, lineTypeDecision } = props;

  const [showLineModal, setShowLineModal] = useState<boolean>(false);
  const [showAddDecisionModal, setShowAddDecisionModal] =
    useState<boolean>(false);

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

  return {
    formId,
    message,
    showLineModal,
    showAddDecisionModal,
    setShowLineModal,
    handleGoBack,
    handleGoContinue,
  };
};

export { useDecisionTemplate };
