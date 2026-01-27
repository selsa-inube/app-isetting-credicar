import { useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { getNewInsertDecisionsConfig } from "@utils/getNewInsertDecisionsConfig";
import { transformRuleStructure } from "@utils/transformRuleStructure";
import { getUpdateDecisionsConfig } from "@utils/getUpdateDecisionsConfig";
import { normalizeEvaluateRuleConfig } from "@utils/normalizeEvaluateRuleConfig";
import { formatEditRuleDecisionsConfig } from "@utils/formatEditRuleDecisionsConfig";
import { mergeRulesPreservingExisting } from "@utils/mergeRulesPreservingExisting";
import { getNewDeletedDecisionsConfig } from "@utils/getNewDeletedDecisionsConfig";
import { removeDeletedDecisions } from "@utils/removeDeletedDecisions";
import { rulesExcludedByEvaluate } from "@config/creditLines/configuration/rulesExcludedByEvaluate";
import { IUseEditCreditLines } from "@ptypes/hooks/creditLines/IUseEditCreditLines";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { useConfiguredDecision } from "../useConfiguredDecision";

const useEditCreditLines = (props: IUseEditCreditLines) => {
  const {
    useCaseConfiguration,
    templateKey,
    decisionsData,
    linesConstructionData,
    linesEditData,
    setLinesConstructionData,
    setLinesEditData,
    mergeRules,
    addDecision,
    editDecision,
    deleteDecision,
  } = props;

  const [optionsConditionsCSV, setOptionsConditionsCSV] = useState<string>();

  const getRule = (ruleName: string) =>
    useConfiguredDecision({
      ruleName,
      decisionValue: linesConstructionData.abbreviatedName as string,
      useCaseConfiguration,
      linesConstructionData,
    });

  const {
    configuredDecisions,
    loading: ruleLoadding,
    hasError: ruleError,
    errorData: ruleErrorData,
  } = getRule(templateKey || "");

  useEffect(() => {
    if (
      useCaseConfiguration === EUseCase.EDIT ||
      useCaseConfiguration === EUseCase.DETAILS_CONDITIONAL
    ) {
      if (
        !ruleLoadding &&
        configuredDecisions &&
        configuredDecisions.length > 0
      ) {
        const optionConditions = configuredDecisions[0]?.parameterizedConditions
          ?.filter(
            (parametrized) => parametrized !== ECreditLines.CREDIT_LINE_RULE,
          )
          .join(",")
          .trim();

        if (optionConditions) {
          setOptionsConditionsCSV(optionConditions);
        }

        const clientSupportFiltered = linesConstructionData.rules?.filter(
          (rule) => rule.ruleName === ECreditLines.CLIENT_SUPPORT_RULE,
        );

        const creditLineFiltered = linesConstructionData.rules?.filter(
          (rule) => rule.ruleName === ECreditLines.CREDIT_LINE_RULE,
        );

        const isClientSupportMissing =
          templateKey === ECreditLines.CLIENT_SUPPORT_RULE &&
          (!clientSupportFiltered || clientSupportFiltered.length === 0);

        const isCreditLineMissing =
          templateKey === ECreditLines.CREDIT_LINE_RULE &&
          (!creditLineFiltered || creditLineFiltered.length === 0);

        const validateRulesExcluded =
          rulesExcludedByEvaluate.includes(templateKey);

        const decisionsValidate =
          !validateRulesExcluded && decisionsData.length === 0;

        const shouldNormalize =
          decisionsValidate || isClientSupportMissing || isCreditLineMissing;

        if (shouldNormalize) {
          const normalized = normalizeEvaluateRuleConfig(configuredDecisions);

          setLinesConstructionData((prev) => {
            const normalizeData: ILinesConstructionData = {
              settingRequestId:
                prev.settingRequestId || linesConstructionData.settingRequestId,
            };
            const existingRules = (prev?.rules ?? []) as IRuleDecision[];
            const newRules = normalized;

            normalizeData.rules = mergeRulesPreservingExisting(
              existingRules,
              newRules,
            );

            const updatedData = removeDeletedDecisions(
              normalizeData,
              linesEditData,
            );

            return {
              ...prev,
              ...updatedData,
            };
          });
        }
      }
    }
  }, [
    configuredDecisions,
    decisionsData,
    useCaseConfiguration,
    ruleLoadding,
    templateKey,
  ]);

  useEffect(() => {
    if (ruleLoadding && decisionsData.length === 0) return;

    const newInsertDecision = getNewInsertDecisionsConfig(
      addDecision,
      normalizeEvaluateRuleConfig(configuredDecisions) ?? [],
      transformRuleStructure(decisionsData),
      linesConstructionData.abbreviatedName as string,
    );

    const newUpdateDecision = getUpdateDecisionsConfig(
      editDecision,
      normalizeEvaluateRuleConfig(configuredDecisions) ?? [],
      transformRuleStructure(decisionsData),
      linesConstructionData.abbreviatedName as string,
    );

    const newDeleteDecision = getNewDeletedDecisionsConfig(
      deleteDecision,
      normalizeEvaluateRuleConfig(configuredDecisions) ?? [],
      transformRuleStructure(decisionsData),
    );

    const insertValues = [newInsertDecision].filter(
      (decision) => decision !== undefined,
    );

    const updateValues = [newUpdateDecision].filter(
      (decision) => decision !== undefined,
    );
    const deleteValues = [newDeleteDecision].filter(
      (decision) => decision !== undefined,
    );

    const allDecisions = [
      ...insertValues,
      ...updateValues,
      ...deleteValues,
    ].flatMap((item) => item as IRuleDecisionExtended);

    if (useCaseConfiguration === EUseCase.EDIT && allDecisions.length > 0) {
      setLinesEditData((prev) => {
        const existingRules =
          (prev?.rules as IRuleDecision[] | undefined) ?? [];

        const mergedRules = mergeRules(existingRules, allDecisions);

        const newState = {
          ...prev,
          settingRequestId: linesConstructionData.settingRequestId,
          lineOfCreditId: linesConstructionData.settingRequestId,
          rules: mergedRules,
        };

        return newState;
      });
    }
  }, [
    useCaseConfiguration,
    decisionsData,
    addDecision,
    editDecision,
    deleteDecision,
    ruleLoadding,
  ]);

  useEffect(() => {
    const validate = useCaseConfiguration === EUseCase.EDIT;

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
  return {
    optionsConditionsCSV,
    ruleError,
    ruleErrorData,
    ruleLoadding,
    configuredDecisions,
  };
};

export { useEditCreditLines };
