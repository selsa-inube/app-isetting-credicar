/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useGetConfiguredDecisions } from "@hooks/rules/useGetConfiguredDecisions";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { getNewInsertDecisionsConfig } from "@utils/getNewInsertDecisionsConfig";
import { transformRuleStructure } from "@utils/transformRuleStructure";
import { normalizeEvaluateRuleConfig } from "@utils/normalizeEvaluateRuleConfig";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { getNewDeletedDecisionsConfig } from "@utils/getNewDeletedDecisionsConfig";
import { EUseCase } from "@enum/useCase";
import { IUseEditCreditLines } from "@ptypes/hooks/creditLines/IUseEditCreditLines";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const useEditCreditLines = (props: IUseEditCreditLines) => {
  const {
    useCaseConfiguration,
    templateKey,
    decisionsData,
    setLinesConstructionData,
    linesConstructionData,
    mergeRules,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [newDecisions, setNewDecisions] = useState<IRuleDecisionExtended[]>();

  const getRule = (ruleName: string) =>
    useGetConfiguredDecisions({
      useCase: useCaseConfiguration,
      rule: templateKey,
      businessUnits: appData.businessUnit.publicCode,
      ruleData: {
        ruleName,
      },
    });

  const {
    configuredDecisions,
    loading: ruleLoadding,
    hasError: ruleError,
    errorData: ruleErrorData,
  } = getRule(templateKey || "");

  useEffect(() => {
    if (useCaseConfiguration === EUseCase.EDIT) {
      if (
        !ruleLoadding &&
        configuredDecisions &&
        configuredDecisions?.length > 0
      ) {
        if (decisionsData.length > 0) return;
        const normalized = normalizeEvaluateRuleData(configuredDecisions);
        setLinesConstructionData((prev) => {
          const existingRules =
            (prev?.rules as IRuleDecision[] | undefined) ?? [];

          return {
            ...prev,
            settingRequestId: linesConstructionData.settingRequestId,
            rules: mergeRules(existingRules, normalized),
          };
        });
      }
    }
  }, [configuredDecisions]);

  const normalizeDecisionsArray = (data: any): IRuleDecisionExtended[] =>
    (Array.isArray(data) ? data : []).map((item) => ({
      ...item,
      decisionsByRule: Array.isArray(item.decisionsByRule)
        ? item.decisionsByRule.map((dbr: any) => ({
            ...dbr,
            effectiveFrom: formatDateDecision(dbr.effectiveFrom),
          }))
        : [],
    }));

  const newInsertDecision = getNewInsertDecisionsConfig(
    appData.user.userAccount,
    normalizeEvaluateRuleConfig(configuredDecisions) ?? [],
    normalizeDecisionsArray(transformRuleStructure(decisionsData)),
  );

  const newDeleteDecision = getNewDeletedDecisionsConfig(
    appData.user.userAccount,
    normalizeEvaluateRuleConfig(configuredDecisions) ?? [],
    normalizeDecisionsArray(transformRuleStructure(decisionsData)),
  );

  useEffect(() => {
    const insertValues = [newInsertDecision].filter(
      (decision) => decision !== undefined,
    );

    const deleteValues = [newDeleteDecision].filter(
      (decision) => decision !== undefined,
    );
    setNewDecisions(
      [...insertValues, ...deleteValues].flatMap(
        (item) => item as IRuleDecisionExtended,
      ),
    );

    if (decisionsData.length > 0) {
      setLinesConstructionData((prev) => {
        const existingRules =
          (prev?.rules as IRuleDecision[] | undefined) ?? [];
        return {
          ...prev,
          settingRequestId: linesConstructionData.settingRequestId,
          rules: mergeRules(existingRules, decisionsData),
        };
      });
    }
  }, [decisionsData]);

  useEffect(() => {
    if (
      useCaseConfiguration === EUseCase.EDIT &&
      newDecisions &&
      newDecisions.length > 0
    ) {
      //   setLinesConstructionData((prev) => {
      //     const existingRules =
      //       (prev?.rules as IRuleDecision[] | undefined) ?? [];
      //     return {
      //       ...prev,
      //       settingRequestId: linesConstructionData.settingRequestId,
      //       rules: mergeRules(existingRules, newDecisions),
      //     };
      //   });
    }
  }, [useCaseConfiguration, newDecisions]);

  return {
    ruleError,
    ruleErrorData,
    ruleLoadding,
  };
};

export { useEditCreditLines };
