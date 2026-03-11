import { useEffect } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { EUseCase } from "@enum/useCase";
import { formatEditRuleDecisionsConfig } from "@utils/formatEditRuleDecisionsConfig";
import { IUseEditRequestCreditLine } from "@ptypes/hooks/creditLines/IUseEditRequestCreditLine";

const useEditRequestCreditLine = (props: IUseEditRequestCreditLine) => {
  const {
    useCaseConfiguration,
    decisionsData,
    linesConstructionData,
    setLinesConstructionData,
    mergeRules,
  } = props;

  useEffect(() => {
    const validate = useCaseConfiguration === EUseCase.ADD;

    if (!validate || decisionsData.length === 0) {
      return;
    }

    const newFormattedRules = formatEditRuleDecisionsConfig(
      decisionsData,
      false,
      linesConstructionData.abbreviatedName as string,
    );

    setLinesConstructionData((prev) => {
      const existingRules = (prev?.rules as IRuleDecision[] | undefined) ?? [];

      return {
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        rules: mergeRules(existingRules, newFormattedRules),
      };
    });
  }, [decisionsData, useCaseConfiguration]);
};

export { useEditRequestCreditLine };
