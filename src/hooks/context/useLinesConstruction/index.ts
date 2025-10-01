import { useMemo, useState } from "react";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";

const useLinesConstruction = () => {
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false);
  const [linesConstructionData, setLinesConstructionData] =
    useState<ILinesConstructionData>({
      settingRequestId: "",
      abbreviatedName: "",
      alias: "",
      descriptionUse: "",
      lineOfCreditId: "",
      rules: [],
    });

  const constructionContainer = useMemo(
    () => ({
      linesConstructionData,
      loadingInitial,
      setLinesConstructionData,
      setLoadingInitial,
    }),
    [linesConstructionData, loadingInitial],
  );

  return { constructionContainer };
};

export { useLinesConstruction };
