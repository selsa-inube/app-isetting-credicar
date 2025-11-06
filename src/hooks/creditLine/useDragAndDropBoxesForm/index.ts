/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { formatDate } from "@utils/date/formatDate";
import { mergeEditRules } from "@utils/mergeEditRules";
import { EBooleanText } from "@enum/booleanText";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { ETransactionOperation } from "@enum/transactionOperation";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { ISide } from "@ptypes/ISide";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseDragAndDropBoxesForm } from "@ptypes/hooks/creditLines/IUseDragAndDropBoxesForm";

const useDragAndDropBoxesForm = (props: IUseDragAndDropBoxesForm) => {
  const {
    infoRuleName,
    optionsExcluded,
    optionsIncluded,
    ruleLoadding,
    ruleOption,
    templateKey,
    supportLine,
    loadingSupportOptions,
    setOptionsIncluded,
    setOptionsExcluded,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const currentDate = useMemo(() => formatDate(new Date()), []);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [move, setMove] = useState<boolean>(false);

  const {
    setLinesConstructionData,
    setLinesEditData,
    linesConstructionData,
    useCaseConfiguration,
  } = useContext(CreditLinesConstruction);

  const lineData = useCallback(
    (data: ILinesConstructionData) =>
      data?.rules?.find((rule) => rule.ruleName === ruleOption),
    [],
  );

  const getConditionsOrganized = useCallback(
    (data: ILinesConstructionData, id: string) => {
      if (data.lineOfCreditId !== id) {
        return [];
      }
      const result: any = [];

      lineData(data)?.decisionsByRule?.forEach((decision) => {
        decision.conditionGroups?.forEach((group) => {
          group.conditionsThatEstablishesTheDecision.forEach((condition) => {
            result.push(condition.value);
          });
        });
      });
      return result;
    },
    [linesConstructionData.rules],
  );

  const supportIncludedOptions = useCallback(() => {
    const conditionGroupsData = getConditionsOrganized(
      linesConstructionData,
      linesConstructionData.settingRequestId,
    );

    const lineDecisions = linesConstructionData?.rules
      ?.find((rule) => rule.ruleName === ruleOption)
      ?.decisionsByRule?.map((rule) => String(rule?.value));

    const rulesToInclude =
      useCaseConfiguration === EUseCase.ADD
        ? lineDecisions
        : (conditionGroupsData?.length ?? 0) > 0
          ? conditionGroupsData
          : lineDecisions;

    if (!rulesToInclude || rulesToInclude.length === 0) {
      return {
        includedOptions: mapSupportLinesToLanguage(supportLine),
        excludedOptions: [],
      };
    }

    const includedCodes = new Set(
      Array.isArray(rulesToInclude[0])
        ? rulesToInclude.flatMap((item: any) => item)
        : rulesToInclude,
    );

    const included = supportLine
      .filter((line) => includedCodes.has(line.code))
      .map((line) => getLineLabel(line));

    const excluded = supportLine
      .filter((line) => !includedCodes.has(line.code))
      .map((line) => getLineLabel(line));

    return { includedOptions: included, excludedOptions: excluded };
  }, [
    linesConstructionData,
    ruleOption,
    useCaseConfiguration,
    supportLine,
    appData.language,
    getConditionsOrganized,
  ]);

  const getLineLabel = (line: IEnumerators): string => {
    return (
      line.i18n?.[appData.language as keyof typeof line.i18n] ??
      line.description ??
      ""
    );
  };

  const mapSupportLinesToLanguage = (lines: IEnumerators[]): string[] => {
    return lines.map((line) => getLineLabel(line));
  };

  useEffect(() => {
    if (supportLine.length > 0) {
      const { includedOptions, excludedOptions } = supportIncludedOptions();

      setOptionsIncluded((prev) => ({
        ...prev,
        items: includedOptions,
      }));

      setOptionsExcluded((prev) => ({
        ...prev,
        items: excludedOptions,
      }));
    }
  }, [supportLine, linesConstructionData?.rules]);

  const targetInsertMode = EBooleanText.PREPEND;

  const removeFrom = useCallback((options: string[], item: string) => {
    const IndexOptions = options.indexOf(item);
    if (IndexOptions === -1) return options;
    const copyOptions = options.slice();
    copyOptions.splice(IndexOptions, 1);
    return copyOptions;
  }, []);

  const insertInto = useCallback(
    (options: string[], item: string) => {
      if (targetInsertMode === EBooleanText.PREPEND) return [item, ...options];
      return [...options, item];
    },
    [targetInsertMode],
  );

  const handleMove = useCallback(
    (payload: { item: string; from: ISide; to: ISide }) => {
      const { item, from, to } = payload;
      setMove(false);

      if (from === EBooleanText.LEFT && to === EBooleanText.RIGHT) {
        setMove(true);
        setOptionsExcluded((prev) => ({
          ...prev,
          items: removeFrom(prev.items, item),
        }));
        setOptionsIncluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
      } else if (from === EBooleanText.RIGHT && to === EBooleanText.LEFT) {
        setMove(true);
        setOptionsExcluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
        setOptionsIncluded((prev) => ({
          ...prev,
          items: removeFrom(prev.items, item),
        }));
      }
    },
    [insertInto, removeFrom],
  );

  const information = infoRulesMessage();

  const message = String(
    information[infoRuleName as keyof typeof information] ||
      information.Default,
  );

  const supportIncludedData = useCallback(() => {
    if (optionsIncluded.items.length === 0) {
      return undefined;
    }

    const includedCodes = new Set(
      optionsIncluded.items.map((rule) => String(rule)),
    );

    const included = supportLine
      .filter((lineEnum) =>
        includedCodes.has(
          lineEnum.i18n?.[appData.language as keyof typeof lineEnum.i18n] ??
            lineEnum.description ??
            "",
        ),
      )
      .map((line) => line.code);
    return included;
  }, [
    optionsIncluded.items,
    optionsExcluded.items,
    supportLine,
    appData.language,
    templateKey,
    currentDate,
  ]);

  useEffect(() => {
    if (!move || useCaseConfiguration !== EUseCase.EDIT) return;

    const included = supportIncludedData();

    const data = linesConstructionData?.rules?.find(
      (rule) => rule.ruleName === ruleOption,
    )?.decisionsByRule;

    const transformJson = {
      decisionId: data?.[0].decisionId,
      ruleName: ECreditLines.CLIENT_SUPPORT_RULE,
      ruleDataType: data?.[0].ruleDataType,
      value: data?.[0].value,
      howToSetTheDecision: data?.[0].howToSetTheDecision,
      effectiveFrom: formatDateDecision(String(new Date())),
      transactionOperation: ETransactionOperation.INSERT_OR_UPDATE,

      conditionGroups: included?.map((rule) => ({
        conditionsThatEstablishesTheDecision: [
          {
            conditionDataType: "Alphabetical",
            conditionName: "CreditRiskProfile",
            howToSetTheCondition: "EqualTo",
            value: rule,
            transactionOperation: ETransactionOperation.INSERT_OR_UPDATE,
          },
        ],
      })),
    };

    const newValues = [
      {
        ruleName: templateKey,
        modifyJustification: `${decisionsLabels.modifyJustification} ${appData.user.userAccount}`,
        decisionsByRule: [transformJson],
      },
    ];

    setLinesEditData((prev) => {
      const existingRules = (prev?.rules ?? []) as IRuleDecision[];
      return {
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        lineOfCreditId: linesConstructionData.settingRequestId,
        rules: mergeEditRules(existingRules, newValues),
      };
    });

    setLinesConstructionData((prev) => {
      const existingRules = (prev?.rules ?? []) as IRuleDecision[];
      return {
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        rules: mergeEditRules(existingRules, newValues),
      };
    });
  }, [move, useCaseConfiguration]);

  useEffect(() => {
    const loading =
      ruleLoadding ||
      loadingSupportOptions ||
      (optionsIncluded.items.length === 0 &&
        optionsExcluded.items.length === 0);

    if (loading) {
      setLoadingData(loading);
      setTimeout(() => {
        setLoadingData(false);
      }, 2500);
    }
  }, [
    ruleLoadding,
    loadingSupportOptions,
    optionsIncluded.items,
    optionsExcluded.items,
  ]);

  return {
    message,
    loadingSupportOptions,
    loadingData,
    useCaseConfiguration,
    handleMove,
  };
};

export { useDragAndDropBoxesForm };
