/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useCallback } from "react";
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { ETransactionOperation } from "@enum/transactionOperation";
import { formatDate } from "@utils/date/formatDate";
import { mergeEditClientRules } from "@utils/mergeEditClientRules";
import { mergeEditRules } from "@utils/mergeEditRules";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IUseUpateData } from "@ptypes/hooks/creditLines/IUseUpateData";

const useUpateData = (props: IUseUpateData) => {
  const {
    condition,
    configuredDecisions,
    currentRuleData,
    itemDelete,
    itemInsert,
    move,
    supportLine,
    templateKey,
    lineNameDecision,
    setMove,
    supportIncludedData,
    setLinesData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const {
    setLinesConstructionData,
    setLinesEditData,
    linesConstructionData,
    useCaseConfiguration,
  } = useContext(CreditLinesConstruction);

  const getSupportIncludedData = useCallback(() => {
    return supportIncludedData();
  }, [supportIncludedData]);

  useEffect(() => {
    const option =
      useCaseConfiguration === EUseCase.EDIT ||
      useCaseConfiguration === EUseCase.ADD;

    if (!move || !option) {
      return;
    }

    const included = getSupportIncludedData();

    const firstDecision = currentRuleData?.decisionsByRule?.[0];

    const transformJson = {
      ruleName: templateKey,
      ruleDataType: firstDecision?.ruleDataType ?? "Alphabetical",
      value: linesConstructionData.abbreviatedName,
      howToSetTheDecision:
        firstDecision?.howToSetTheDecision ?? EValueHowToSetUp.EQUAL,
      effectiveFrom: formatDate(new Date()),
      conditionGroups: included?.map((rule) => ({
        conditionsThatEstablishesTheDecision: [
          {
            conditionDataType: "Alphabetical",
            conditionName: condition,
            howToSetTheCondition: "EqualTo",
            value: rule,
          },
          {
            conditionDataType: "Alphabetical",
            conditionName: ECreditLines.CREDIT_LINE_RULE,
            howToSetTheCondition: "EqualTo",
            value: lineNameDecision,
          },
        ],
      })),
    };

    const newValues = [
      {
        ruleName: templateKey,
        decisionsByRule: [transformJson],
      },
    ];

    const initiaConditionGroups = configuredDecisions?.flatMap(
      (config) => config.decisionsByRule || [],
    );

    const editCondition = () => {
      const conditionGroups: any[] = [];

      const enums = (condition: string) =>
        supportLine.find(
          (value) =>
            value.i18n?.[appData.language as keyof typeof value.i18n] ===
              condition || value.description === condition,
        );

      const initialData = (rule: string) => {
        if (!initiaConditionGroups) return undefined;

        for (const decision of initiaConditionGroups) {
          const group = decision.conditionGroups.find((group) =>
            group.conditionsThatEstablishesTheDecision.some(
              (condition) => condition.value === rule,
            ),
          );
          if (group?.conditionGroupId) {
            return group.conditionGroupId;
          }
        }

        return undefined;
      };

      itemInsert.forEach((ruleCode) => {
        conditionGroups.push({
          conditionsThatEstablishesTheDecision: [
            {
              conditionDataType: "Alphabetical",
              conditionName: condition,
              howToSetTheCondition: "EqualTo",
              value: enums(ruleCode)?.code,
              transactionOperation: ETransactionOperation.INSERT,
            },
            {
              conditionDataType: "Alphabetical",
              conditionName: ECreditLines.CREDIT_LINE_RULE,
              howToSetTheCondition: "EqualTo",
              value: lineNameDecision,
              transactionOperation: ETransactionOperation.INSERT,
            },
          ],
        });
      });

      itemDelete.forEach((ruleCode) => {
        conditionGroups.push({
          conditionGroupId: initialData(enums(ruleCode)?.code || ""),
          conditionsThatEstablishesTheDecision: [
            {
              conditionDataType: "Alphabetical",
              conditionName: condition,
              howToSetTheCondition: "EqualTo",
              value: enums(ruleCode)?.code,
              transactionOperation: ETransactionOperation.DELETE,
            },
            {
              conditionDataType: "Alphabetical",
              conditionName: ECreditLines.CREDIT_LINE_RULE,
              howToSetTheCondition: "EqualTo",
              value: lineNameDecision,
              transactionOperation: ETransactionOperation.DELETE,
            },
          ],
        });
      });

      return conditionGroups;
    };

    const transformEditJson = {
      decisionId: initiaConditionGroups?.[0].decisionId,
      ruleName: templateKey,
      ruleDataType: firstDecision?.ruleDataType,
      value: firstDecision?.value,
      howToSetTheDecision: firstDecision?.howToSetTheDecision,
      effectiveFrom: formatDate(new Date()),
      transactionOperation: ETransactionOperation.INSERT_OR_UPDATE,
      conditionGroups: editCondition(),
    };

    const newEditValues = [
      {
        ruleName: templateKey,
        modifyJustification: `${decisionsLabels.modifyJustification} ${templateKey}`,
        decisionsByRule: [transformEditJson],
      },
    ];

    if (useCaseConfiguration === EUseCase.ADD) {
      setLinesData((prev: any) => {
        const existingRules =
          (prev?.configurationRequestData?.rules as
            | IRuleDecision[]
            | undefined) ??
          (linesConstructionData.rules as IRuleDecision[] | undefined) ??
          [];
        const updatedRules = mergeEditRules(existingRules, newValues);
        return {
          ...prev,
          settingRequestId: linesConstructionData.settingRequestId,
          configurationRequestData: {
            alias: linesConstructionData.alias,
            abbreviatedName: linesConstructionData.abbreviatedName,
            descriptionUse: linesConstructionData.descriptionUse,
            rules: updatedRules,
          },
        };
      });

      setLinesConstructionData((prev: any) => ({
        ...prev,
        rules: mergeEditRules(prev.rules ?? [], newValues),
      }));
    }

    if (useCaseConfiguration === EUseCase.EDIT) {
      setLinesEditData((prev: any) => {
        const existingRules = (prev?.rules ?? []) as IRuleDecision[];

        return {
          ...prev,
          settingRequestId: linesConstructionData.settingRequestId,
          lineOfCreditId: linesConstructionData.settingRequestId,
          rules: mergeEditClientRules(existingRules, newEditValues),
        };
      });

      setLinesConstructionData((prev: any) => {
        const existingRules = (prev?.rules ?? []) as IRuleDecision[];
        return {
          ...prev,
          settingRequestId: linesConstructionData.settingRequestId,
          lineOfCreditId: linesConstructionData.settingRequestId,
          rules: mergeEditRules(existingRules, newValues),
        };
      });
    }

    setMove(false);
  }, [
    move,
    useCaseConfiguration,
    getSupportIncludedData,
    setLinesData,
    currentRuleData,
    condition,
    templateKey,
    appData.user.userAccount,
    linesConstructionData.settingRequestId,
    setLinesEditData,
    setLinesConstructionData,
  ]);
};

export { useUpateData };
