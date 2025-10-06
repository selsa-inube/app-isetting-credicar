import { useEffect, useMemo, useState } from "react";
import { useEnumAllRulesConfiguration } from "@hooks/useEnumAllRulesConfiguration";
import { ECreditLines } from "@enum/creditLines";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

const useLinesConstruction = () => {
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false);
  const [optionsAllRules, setOptionsAllRules] = useState<INavigationRule[]>([]);
  const [useCaseConfiguration, setUseCaseConfiguration] = useState<string>("");
  const [linesConstructionData, setLinesConstructionData] =
    useState<ILinesConstructionData>({
      settingRequestId: "",
      abbreviatedName: "",
      alias: "",
      descriptionUse: "",
      lineOfCreditId: "",
      rules: [],
    });

  const ruleCatalog = ECreditLines.RULE_CATALOG;
  const catalogAction = ECreditLines.CATALOG_ACTION;

  const { optionsAllRules: rules, enumRuleData } = useEnumAllRulesConfiguration(
    {
      ruleCatalog,
      catalogAction,
    },
  );

  useEffect(() => {
    if (enumRuleData.length > 0) {
      setOptionsAllRules(rules as INavigationRule[]);
    }
  }, [enumRuleData]);

  const constructionContainer = useMemo(
    () => ({
      linesConstructionData,
      loadingInitial,
      optionsAllRules,
      useCaseConfiguration,
      setLinesConstructionData,
      setLoadingInitial,
      setOptionsAllRules,
      setUseCaseConfiguration,
    }),
    [linesConstructionData, loadingInitial],
  );

  return { constructionContainer };
};

export { useLinesConstruction };
