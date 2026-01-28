/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EBooleanText } from "@enum/booleanText";
import { EUseCase } from "@enum/useCase";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { ISide } from "@ptypes/ISide";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseDragAndDropBoxesForm } from "@ptypes/hooks/creditLines/IUseDragAndDropBoxesForm";
import { useUpdateData } from "../useUpdateData";

const useDragAndDropBoxesForm = (props: IUseDragAndDropBoxesForm) => {
  const {
    infoRuleName,
    optionsExcluded,
    optionsIncluded,
    ruleLoadding,
    ruleOption,
    templateKey,
    supportLine,
    condition,
    loadingSupportOptions,
    configuredDecisions,
    lineNameDecision,
    setOptionsIncluded,
    setOptionsExcluded,
    setLinesData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [move, setMove] = useState<boolean>(false);
  const [itemInsert, setItemInsert] = useState<string[]>([]);
  const [itemDelete, setItemDelete] = useState<string[]>([]);

  const { linesConstructionData, useCaseConfiguration } = useContext(
    CreditLinesConstruction,
  );

  const translationToCodeMap = useMemo(() => {
    const map = new Map<string, string>();
    supportLine.forEach((line) => {
      const label =
        line.i18n?.[appData.language as keyof typeof line.i18n] ??
        line.description ??
        "";
      if (label) {
        map.set(label, line.code);
      }
    });
    return map;
  }, [supportLine, appData.language]);

  const getLineLabel = useCallback(
    (line: IEnumerators): string => {
      return (
        line.i18n?.[appData.language as keyof typeof line.i18n] ??
        line.description ??
        ""
      );
    },
    [appData.language],
  );

  const mapSupportLinesToLanguage = useCallback(
    (lines: IEnumerators[]): string[] => {
      return lines.map((line) => getLineLabel(line));
    },
    [getLineLabel],
  );

  const lineData = useCallback(
    (data: ILinesConstructionData) =>
      data?.rules?.find((rule) => rule.ruleName === ruleOption),
    [ruleOption],
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
    [lineData],
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
      (conditionGroupsData?.length ?? 0) > 0
        ? conditionGroupsData
        : lineDecisions;

    if (!rulesToInclude || rulesToInclude.length === 0) {
      return {
        includedOptions: [],
        excludedOptions: mapSupportLinesToLanguage(supportLine),
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
    getConditionsOrganized,
    mapSupportLinesToLanguage,
    getLineLabel,
  ]);

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
  }, [supportLine, linesConstructionData?.rules, supportIncludedOptions]);

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
        setItemInsert((prev) => [...prev, item]);
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
        setItemDelete((prev) => [...prev, item]);
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

  const information = useMemo(() => infoRulesMessage(), []);

  const message = useMemo(
    () =>
      String(
        information[infoRuleName as keyof typeof information] ||
          information.Default,
      ),
    [information, infoRuleName],
  );

  const supportIncludedData = useCallback(() => {
    if (optionsIncluded.items.length === 0) {
      return [];
    }

    const includedCodes = optionsIncluded.items
      .map((item) => translationToCodeMap.get(String(item)))
      .filter((code): code is string => code !== undefined);

    return includedCodes;
  }, [optionsIncluded.items, translationToCodeMap]);

  const currentRuleData = useMemo(() => {
    return linesConstructionData?.rules?.find(
      (rule) => rule.ruleName === ruleOption,
    );
  }, [linesConstructionData?.rules, ruleOption]);

  useUpdateData({
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
  });

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
    optionsIncluded.items.length,
    optionsExcluded.items.length,
  ]);

  const showInfo =
    useCaseConfiguration === EUseCase.EDIT ||
    useCaseConfiguration === EUseCase.ADD;

  return {
    message,
    loadingSupportOptions,
    loadingData,
    showInfo,
    useCaseConfiguration,
    handleMove,
  };
};

export { useDragAndDropBoxesForm };
