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

const useCreditLineForm = (props: IUseClientsSupportLineForm) => {
  const { templateKey } = props;
  const {
    showInfoModal,
    creditOptionsExcluded,
    creditOptionsIncluded,
    loading,
    nav,
    loadingModify,
    lineNameDecision,
    showSendModal,
    submitModalData,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    useCaseConfiguration,
    optionIcon,
    linesConstructionData,
    ruleLoadding,
    creditLineData,
    setCreditLineData,
    setCreditOptionsIncluded,
    setCreditOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { appData } = useContext(AuthAndPortalData);
  const currentDate = useMemo(() => formatDate(new Date()), []);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  ///////////////////////////////////////
  const { enumData: supportLine, loading: loadingSupportOptions } =
    useEnumeratorsCrediboard({
      businessUnits: appData.businessUnit.publicCode,
      enumQuery: ECreditLines.SUPPORT_LINE,
    });

  const lineData = useCallback(
    (data: ILinesConstructionData) =>
      data?.rules?.find(
        (rule) => rule.ruleName === ECreditLines.CREDIT_LINE_RULE,
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
        (rule) => rule.ruleName === ECreditLines.CREDIT_LINE_RULE,
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

      setCreditOptionsIncluded((prev) => ({
        ...prev,
        items: includedOptions,
      }));

      setCreditOptionsExcluded((prev) => ({
        ...prev,
        items: excludedOptions,
      }));
    }
  }, [
    supportLine,
    ruleLoadding,
    linesConstructionData.rules,
    lineData,
    creditOptionsIncluded.items.length,
    creditOptionsExcluded.items.length,
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
        setCreditOptionsExcluded((prev) => ({
          ...prev,
          items: removeFrom(prev.items, item),
        }));
        setCreditOptionsIncluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
      } else if (from === EBooleanText.RIGHT && to === EBooleanText.LEFT) {
        setCreditOptionsExcluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
        setCreditOptionsIncluded((prev) => ({
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
    if (creditOptionsIncluded.items.length === 0) {
      return undefined;
    }

    const includedCodes = new Set(
      creditOptionsIncluded.items.map((rule) => String(rule)),
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
    creditOptionsIncluded.items,
    supportLine,
    appData.language,
    templateKey,
    currentDate,
  ]);

  useEffect(() => {
    const data = supportIncludedData();

    if (JSON.stringify(data) !== JSON.stringify(creditLineData)) {
      setCreditLineData(data);
    }
  }, [
    supportIncludedData,
    lineData,
    creditOptionsIncluded.items.length,
    creditOptionsExcluded.items.length,
  ]);

  useEffect(() => {
    const loading =
      ruleLoadding ||
      loadingSupportOptions ||
      (creditOptionsIncluded.items.length === 0 &&
        creditOptionsExcluded.items.length === 0);

    if (loading) {
      setLoadingData(loading);
      setTimeout(() => {
        setLoadingData(false);
      }, 2500);
    }
  }, [
    ruleLoadding,
    loadingSupportOptions,
    creditOptionsIncluded.items.length,
    creditOptionsExcluded.items.length,
  ]);

  return {
    creditOptionsExcluded,
    creditOptionsIncluded,
    showInfoModal,
    loading,
    loadingModify,
    nav,
    lineNameDecision,
    message,
    loadingSupportOptions,
    loadingData,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    showSendModal,
    submitModalData,
    useCaseConfiguration,
    handleMove,
    handleOpenModal,
    handleToggleInfoModal,
  };
};

export { useCreditLineForm };
