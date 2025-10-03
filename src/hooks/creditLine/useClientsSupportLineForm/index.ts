import { useCallback, useContext, useEffect, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { formatDate } from "@utils/date/formatDate";
import { EBooleanText } from "@enum/booleanText";
import { ECreditLines } from "@enum/creditLines";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { IUseClientsSupportLineForm } from "@ptypes/hooks/creditLines/IUseClientsSupportLineForm";
import { ISide } from "@ptypes/ISide";
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
    showInfoErrorModal,
    modalData,
    handleClickInfo,
    setClientSupportData,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { appData } = useContext(AuthAndPortalData);
  const { linesConstructionData } = useContext(CreditLinesConstruction);

  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(
    null,
  );

  const { enumData: supportLine, loading: loadingSupportOptions } =
    useEnumeratorsCrediboard({
      businessUnits: appData.businessUnit.publicCode,
      enumQuery: ECreditLines.SUPPORT_LINE,
    });

  const supportIncludedOptions = () => {
    const rulesSupport = linesConstructionData?.rules?.find(
      (rule) => rule.ruleName === "CreditLineByRiskProfile",
    )?.decisionsByRule;

    if (rulesSupport && rulesSupport.length > 0) {
      const includedCodes = new Set(
        rulesSupport.map((rule) => String(rule.value)),
      );

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
    }

    const allOptions = supportLine.map(
      (line) =>
        line.i18n?.[appData.language as keyof typeof line.i18n] ??
        line.description ??
        "",
    );

    return { includedOptions: allOptions, excludedOptions: [] };
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
    information["clientsSupported" as keyof typeof information] ||
      information.Default,
  );

  const supportIncludedData = () => {
    if (optionsIncluded.items.length > 0) {
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
        effectiveFrom: formatDate(new Date()),
        value: rule,
      }));

      return [
        {
          ruleName: templateKey,
          decisionsByRule: transformJson,
        },
      ];
    }
  };

  useEffect(() => {
    setClientSupportData(supportIncludedData);
  }, [optionsIncluded]);

  const loadingData =
    loadingSupportOptions ||
    (optionsIncluded.items.length === 0 && optionsExcluded.items.length === 0);

  return {
    selectedConditionId,
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
    showInfoErrorModal,
    modalData,
    handleClickInfo,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleMove,
    handleOpenModal,
    handleToggleInfoModal,
    setSelectedConditionId,
  };
};

export { useClientsSupportLineForm };
