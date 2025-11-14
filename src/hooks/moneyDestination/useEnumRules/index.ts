import { useState, useEffect } from "react";

import { getEnumeratorsRules } from "@services/conditionsRules/getEnumeratorByRules";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { IUseEnumRules } from "@ptypes/hooks/IUseEnumRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const useEnumRules = (props: IUseEnumRules) => {
  const { enumDestination, ruleCatalog, catalogAction, businessUnits } = props;
  const [enumRuleData, setEnumRuleData] = useState<IDecisionData>(
    {} as IDecisionData,
  );
  const [ruleData, setRuleData] = useState<IRuleDecisionExtended>(
    {} as IRuleDecisionExtended,
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      if (enumDestination.length === 0) {
        return;
      }
      try {
        const data = await getEnumeratorsRules(
          enumDestination,
          ruleCatalog,
          catalogAction,
          businessUnits,
        );
        setEnumRuleData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };
    fetchEnumData();
  }, [enumDestination, ruleCatalog, businessUnits]);

  useEffect(() => {
    setRuleData({ ...enumRuleData } as IRuleDecisionExtended);
  }, [enumRuleData]);

  return { ruleData, hasError };
};

export { useEnumRules };
