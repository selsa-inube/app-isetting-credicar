import { createContext } from "react";
import { useLinesConstruction } from "@hooks/context/useLinesConstruction";
import { ICreditLinesConstruction } from "@ptypes/context/creditLinesConstruction/ICreditLinesConstruction";
import { ICreditLinesConstructionProvider } from "@ptypes/context/creditLinesConstruction/ILinesConstructionProvider";

const CreditLinesConstruction = createContext<ICreditLinesConstruction>(
  {} as ICreditLinesConstruction,
);

const CreditLinesConstructionProvider = (
  props: ICreditLinesConstructionProvider,
) => {
  const { children } = props;
  const { constructionContainer } = useLinesConstruction();
  return (
    <CreditLinesConstruction.Provider value={constructionContainer}>
      {children}
    </CreditLinesConstruction.Provider>
  );
};

export { CreditLinesConstruction, CreditLinesConstructionProvider };
export type { ICreditLinesConstructionProvider };
