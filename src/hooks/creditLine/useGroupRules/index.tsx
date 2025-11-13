import { useContext, useEffect, useMemo, useState } from "react";
import { IDropdownMenuGroup } from "@isettingkit/business-rules";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { getAllEgroupRules } from "@services/creditLines/getAllEgroupRules";
import { errorObject } from "@utils/errorObject";
import { normalizeGroupRules } from "@utils/normalizeGroupRules";
import { descriptionLineOption } from "@config/creditLines/configuration/descriptionLineOption";
import { IErrors } from "@ptypes/IErrors";
import { IAllEgroupRuleType } from "@ptypes/creditLines/IAllEgroupRuleType";

const useGroupRules = () => {
  const { appData } = useContext(AuthAndPortalData);
  const { optionsAllRules, allValidRules, setAllValidRules } = useContext(
    CreditLinesConstruction,
  );

  const [groupRules, setGroupRules] = useState<IAllEgroupRuleType[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [groupsData, setGroupsData] = useState<IDropdownMenuGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllEgroupRules(appData.businessUnit.publicCode);
        setGroupRules(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appData.businessUnit.publicCode]);

  const validRules = useMemo(() => {
    if (hasError) {
      return [];
    }
    const validAllRules: string[][] = [];
    groupRules.map((group) => {
      validAllRules.push(group.ruleNameType);
    });

    return validAllRules.flatMap((rule) => rule);
  }, [groupRules, hasError]);

  useEffect(() => {
    if (allValidRules.length === 0 && validRules.length > 0) {
      setAllValidRules(validRules);
    }
  }, [allValidRules, validRules]);

  const optionsGroups = useMemo(() => {
    if (hasError) {
      return [];
    }

    if (groupRules.length > 0) {
      const options: IDropdownMenuGroup[] =
        groupRules?.map((group) => {
          const rules = normalizeGroupRules(
            group.ruleNameType,
            optionsAllRules,
          );
          return {
            id: group.code,
            title:
              group.i18nValue?.[
                appData.language as keyof typeof group.i18nValue
              ] ?? group.value,
            links: rules,
            rulesNames: group.ruleNameType,
          };
        }) ?? [];

      options.unshift({
        id: descriptionLineOption.id,
        title: descriptionLineOption.title,
        path: descriptionLineOption.path,
        links: [],
      });

      setGroupsData(options as unknown as IDropdownMenuGroup[]);
      return options;
    }
  }, [groupRules, hasError, optionsAllRules]);

  return {
    optionsGroups,
    groupRules,
    groupsData,
    hasError,
    errorData,
    loading,
    validRules,
    setHasError,
  };
};

export { useGroupRules };
