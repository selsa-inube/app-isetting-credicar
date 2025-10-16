import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { formatDate } from "@utils/date/formatDate";
import { EBooleanText } from "@enum/booleanText";
import { ECreditLines } from "@enum/creditLines";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { IUseClientsSupportLineForm } from "@ptypes/hooks/creditLines/IUseClientsSupportLineForm";
import { ISide } from "@ptypes/ISide";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { useConfigurationLines } from "../configurationLines/useConfigurationLines";

const useClientsSupportLineForm = (props: IUseClientsSupportLineForm) => {
  const { templateKey } = props;
  const {
    showInfoModal,
    optionsExcluded,
    optionsIncluded,
    loading,
    nav,
    loadingModify,
    lineNameDecision,
    unconfiguredRules,
    showUnconfiguredModal,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    clientSupportData,
    linesConstructionData,
    ruleLoadding,
    setClientSupportData,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { appData } = useContext(AuthAndPortalData);
  const currentDate = useMemo(() => formatDate(new Date()), []);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const { enumData: supportLine, loading: loadingSupportOptions } =
    useEnumeratorsCrediboard({
      businessUnits: appData.businessUnit.publicCode,
      enumQuery: ECreditLines.SUPPORT_LINE,
    });

  const lineData = useCallback(
    (data: ILinesConstructionData) =>
      data?.rules?.find(
        (rule) => rule.ruleName === ECreditLines.CLIENT_SUPPORT_RULE,
      ),
    [],
  );

  const getConditionsOrganized = useCallback(
    (data: ILinesConstructionData, id: string) => {
      if (data.lineOfCreditId !== id) {
        return [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const supportIncludedOptions = () => {
    const rulesSupport = [];

    const conditionGroupsData = getConditionsOrganized(
      linesConstructionData,
      linesConstructionData.settingRequestId,
    );

    const validate = conditionGroupsData && conditionGroupsData?.length > 0;
    if (validate) {
      rulesSupport.push(conditionGroupsData);
    } else {
      const line = linesConstructionData?.rules?.find(
        (rule) => rule.ruleName === ECreditLines.CLIENT_SUPPORT_RULE,
      )?.decisionsByRule;

      const lineOption = line?.map((rule) => String(rule?.value));

      rulesSupport.push(lineOption);
    }

    if (rulesSupport && rulesSupport.length > 0) {
      const includedCodes = new Set(rulesSupport.flatMap((item) => item));
      const included = supportLine
        .filter((lineEnum) => includedCodes.has(lineEnum.code))
        .map(
          (line) =>
            line.i18n?.[appData.language as keyof typeof line.i18n] ??
            line.description ??
            "",
        );
      const excluded = supportLine
        .filter((line) => !includedCodes.has(line.code))
        .map(
          (line) =>
            line.i18n?.[appData.language as keyof typeof line.i18n] ??
            line.description ??
            "",
        );

      return { includedOptions: included, excludedOptions: excluded };
    } else {
      const allOptions = supportLine.map(
        (line) =>
          line.i18n?.[appData.language as keyof typeof line.i18n] ??
          line.description ??
          "",
      );

      return { includedOptions: allOptions, excludedOptions: [] };
    }
  };

  useEffect(() => {
    if (!ruleLoadding && supportLine.length > 0) {
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
  }, [
    supportLine,
    ruleLoadding,
    linesConstructionData.rules,
    lineData,
    optionsIncluded.items.length,
    optionsExcluded.items.length,
  ]);

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

      if (from === EBooleanText.LEFT && to === EBooleanText.RIGHT) {
        setOptionsExcluded((prev) => ({
          ...prev,
          items: removeFrom(prev.items, item),
        }));
        setOptionsIncluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
      } else if (from === EBooleanText.RIGHT && to === EBooleanText.LEFT) {
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
    information[ECreditLines.CLIENTS_SUPPORTED as keyof typeof information] ||
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

    const transformJson = included.map((rule) => ({
      value: rule,
      effectiveFrom: currentDate,
    }));

    return [
      {
        ruleName: templateKey,
        decisionsByRule: transformJson,
      },
    ];
  }, [
    optionsIncluded.items,
    supportLine,
    appData.language,
    templateKey,
    currentDate,
  ]);

  useEffect(() => {
    const data = supportIncludedData();

    if (JSON.stringify(data) !== JSON.stringify(clientSupportData)) {
      setClientSupportData(data);
    }
  }, [
    supportIncludedData,
    lineData,
    optionsIncluded.items.length,
    optionsExcluded.items.length,
  ]);

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

  return {
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    loadingModify,
    nav,
    lineNameDecision,
    message,
    unconfiguredRules,
    showUnconfiguredModal,
    loadingSupportOptions,
    loadingData,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleMove,
    handleOpenModal,
    handleToggleInfoModal,
  };
};

export { useClientsSupportLineForm };
