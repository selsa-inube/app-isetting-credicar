/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { getNewInsertDecisionsConfig } from "@utils/getNewInsertDecisionsConfig";
import { transformRuleStructure } from "@utils/transformRuleStructure";
import { normalizeEvaluateRuleConfig } from "@utils/normalizeEvaluateRuleConfig";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { getNewDeletedDecisionsConfig } from "@utils/getNewDeletedDecisionsConfig";
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
    linesData,
    nameLineRef,
    setLinesConstructionData,
    setLinesData,
    setLinesEditData,
    mergeRules,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [newDecisions, setNewDecisions] = useState<IRuleDecisionExtended[]>();
  const [optionsConditionsCSV, setOptionsConditionsCSV] = useState<string>();

  const getRule = (ruleName: string) =>
    // useGetConfiguredDecisions({
    //   useCase: useCaseConfiguration,
    //   rule: templateKey,
    //   businessUnits: appData.businessUnit.publicCode,
    //   ruleData: {
    //     ruleName,
    //     conditions: [
    //       {
    //         condition: ECreditLines.CREDIT_LINE_RULE,
    //         value: linesConstructionData.abbreviatedName as string,
    //       },
    //     ],
    //   },
    // });
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
        if (decisionsData.length === 0 && setLinesData) {
          const normalized = normalizeEvaluateRuleConfig(configuredDecisions);
          const optionConditions = configuredDecisions[0]
            .parameterizedConditions
            ? configuredDecisions[0].parameterizedConditions
                ?.filter(
                  (parametrized) =>
                    parametrized !== ECreditLines.CREDIT_LINE_RULE,
                )
                .join(",")
                .trim()
            : undefined;
          setOptionsConditionsCSV(optionConditions);

          setLinesData((prev) => {
            const existingRules =
              (prev?.configurationRequestData?.rules as
                | IRuleDecision[]
                | undefined) ?? [];

            return {
              ...prev,
              settingRequestId: linesConstructionData.settingRequestId,
              configurationRequestData: {
                ...prev?.configurationRequestData,
                rules: mergeRules(existingRules, normalized),
              },
            };
          });
        }
      }
    }
  }, [configuredDecisions, decisionsData, useCaseConfiguration, ruleLoadding]);

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
  }, [decisionsData]);

  useEffect(() => {
    if (
      useCaseConfiguration === EUseCase.EDIT &&
      newDecisions &&
      newDecisions.length > 0
    ) {
      setLinesEditData((prev) => {
        const existingRules =
          (prev?.rules as IRuleDecision[] | undefined) ?? [];
        return {
          ...prev,
          settingRequestId: linesConstructionData.settingRequestId,
          lineOfCreditId: linesConstructionData.settingRequestId,
          rules: mergeRules(existingRules, newDecisions),
        };
      });
    }
  }, [useCaseConfiguration, newDecisions]);

  useEffect(() => {
    if (
      useCaseConfiguration === EUseCase.EDIT ||
      useCaseConfiguration === EUseCase.DETAILS_CONDITIONAL
    ) {
      if (!linesData || linesData?.configurationRequestData.length === 0)
        return;

      setLinesConstructionData((prev) => {
        const initialValues = nameLineRef.current?.initialValues;
        const currentValues = nameLineRef.current?.values;

        const hasNameChanged =
          currentValues?.nameLine !== initialValues?.nameLine;
        const hasAliasChanged =
          currentValues?.aliasLine !== initialValues?.aliasLine;
        const hasDescriptionChanged =
          currentValues?.descriptionLine !== initialValues?.descriptionLine;

        const normalizeData: ILinesConstructionData = {
          settingRequestId:
            prev.settingRequestId || linesConstructionData.settingRequestId,
          lineOfCreditId: linesData.settingRequestId,
          abbreviatedName: hasNameChanged
            ? String(linesData.configurationRequestData?.abbreviatedName ?? "")
            : (prev.abbreviatedName ?? ""),
          alias: hasAliasChanged
            ? String(linesData.configurationRequestData?.alias ?? "")
            : (prev.alias ?? ""),
          descriptionUse: hasDescriptionChanged
            ? String(linesData.configurationRequestData?.descriptionUse ?? "")
            : (prev.descriptionUse ?? ""),
        };

        if (linesData.configurationRequestData?.rules) {
          const existingRules = (prev?.rules ?? []) as IRuleDecision[];
          const newRules = Array.isArray(
            linesData.configurationRequestData.rules,
          )
            ? linesData.configurationRequestData.rules
            : Object.values(linesData.configurationRequestData.rules ?? {});
          normalizeData.rules = mergeRules(existingRules, newRules);
        } else {
          normalizeData.rules = prev.rules;
        }

        return {
          ...prev,
          ...normalizeData,
        };
      });
    }
  }, [linesData, useCaseConfiguration]);

  return {
    optionsConditionsCSV,
    ruleError,
    ruleErrorData,
    ruleLoadding,
  };
};

export { useEditCreditLines };
