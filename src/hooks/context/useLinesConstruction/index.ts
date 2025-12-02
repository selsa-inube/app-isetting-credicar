import { useMemo, useState } from "react";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { IErrors } from "@ptypes/IErrors";

const useLinesConstruction = () => {
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false);
  const [optionsAllRules, setOptionsAllRules] = useState<INavigationRule[]>([]);
  const [allValidRules, setAllValidRules] = useState<string[]>([]);
  const [filterRules, setFilterRules] = useState<string[]>([]);

  const [errorOptionsAllRules, setErrorOptionsAllRules] = useState<IErrors>(
    {} as IErrors,
  );
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

  const [linesEditData, setLinesEditData] = useState<ILinesConstructionData>(
    {} as ILinesConstructionData,
  );

  const constructionContainer = useMemo(
    () => ({
      linesConstructionData,
      loadingInitial,
      optionsAllRules,
      useCaseConfiguration,
      linesEditData,
      errorOptionsAllRules,
      allValidRules,
      filterRules,
      setFilterRules,
      setAllValidRules,
      setErrorOptionsAllRules,
      setLinesConstructionData,
      setLoadingInitial,
      setOptionsAllRules,
      setUseCaseConfiguration,
      setLinesEditData,
    }),
    [linesConstructionData, loadingInitial],
  );

  return { constructionContainer };
};

export { useLinesConstruction };
