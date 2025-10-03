import { useContext, useEffect, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { postCheckLineRuleConsistency } from "@services/creditLines/postCheckLineRuleConsistency";
import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";
import { IUseCheckLineRuleConsistency } from "@ptypes/hooks/creditLines/IUseCheckLineRuleConsistency";

const useCheckLineRuleConsistency = (props: IUseCheckLineRuleConsistency) => {
  const { data } = props;
  const [checkLineRule, setCheckLineRule] = useState<IPostCheckLineRule[]>([]);
  const { appData } = useContext(AuthAndPortalData);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckData = async () => {
      if (data.rules.length > 0) {
        setLoading(true);
        try {
          const result = await postCheckLineRuleConsistency(
            appData.user.userAccount,
            data,
          );
          setCheckLineRule(result);
        } catch (error) {
          console.info(error);
          setHasError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCheckData();
  }, [data]);

  return {
    checkLineRule,
    hasError,
    loading,
  };
};

export { useCheckLineRuleConsistency };
