import { useEffect } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { EUseCase } from "@enum/useCase";
import { formatRuleDecisionsConfig } from "@utils/formatRuleDecisionsConfig";
import { IUseEditRequestCreditLine } from "@ptypes/hooks/creditLines/IUseEditRequestCreditLine";

const useEditRequestCreditLine = (props: IUseEditRequestCreditLine) => {
  const {
    useCaseConfiguration,
    decisionsData,
    linesConstructionData,
    option,
    currentValues,
    conditionCreditLine,
    setLinesConstructionData,
    mergeRules,
  } = props;

  useEffect(() => {
    const validate = option && useCaseConfiguration === EUseCase.ADD;

    if (!validate || decisionsData.length === 0) {
      return;
    }

    const newFormattedRules = formatRuleDecisionsConfig(
      decisionsData,
      false,
      linesConstructionData.abbreviatedName as string,
      conditionCreditLine,
    );

    setLinesConstructionData((prev) => {
      const existingRules = (prev?.rules as IRuleDecision[] | undefined) ?? [];

      return {
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        alias: prev.alias,
        abbreviatedName: prev.abbreviatedName,
        descriptionUse: prev.descriptionUse,
        rules: mergeRules(existingRules, newFormattedRules),
      };
    });
  }, [decisionsData, useCaseConfiguration, currentValues]);
};

export { useEditRequestCreditLine };
