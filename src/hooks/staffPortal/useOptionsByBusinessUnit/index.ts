import { useState, useEffect } from "react";

import { getOptionsByBusinessUnit } from "@services/staffPortal/getOptionsByBusinessUnits";
import { IOptionsByBusinessUnits } from "@ptypes/staffPortal/IOptionsByBusinessUnits";
import { normalizeOptionsByPublicCode } from "@utils/optionByBusinessunit";
import { IUseOptionsByBusinessUnit } from "@ptypes/staffPortal/IUseOptionsByBusinessUnit";

const useOptionsByBusinessUnit = (props: IUseOptionsByBusinessUnit) => {
  const { businessUnit, staffPortalId, optionName } = props;
  const [optionsBusinessUnit, setOptionsBusinessUnit] = useState<
    IOptionsByBusinessUnits[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchOptionBusinessUnitData = async () => {
      setLoading(true);
      try {
        const businessUnitSigla = JSON.parse(businessUnit ?? "{}");

        const data = await getOptionsByBusinessUnit(
          businessUnitSigla.publicCode,
          staffPortalId,
        );
        setOptionsBusinessUnit(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionBusinessUnitData();
  }, [businessUnit]);

  const optionsCards = optionsBusinessUnit
    .filter((option) => normalizeOptionsByPublicCode(option.publicCode))
    .map((option) => {
      const normalizedOption = normalizeOptionsByPublicCode(option.publicCode);
      return {
        id: option.publicCode,
        publicCode: option.abbreviatedName,
        description: option.descriptionUse,
        icon: normalizedOption?.icon ?? "",
        url: normalizedOption?.url ?? "",
      };
    });

  const descriptionOptions =
    optionName &&
    optionsCards.find((option) => option.publicCode === optionName);

  return {
    optionsCards,
    optionsBusinessUnit,
    descriptionOptions,
    loading,
    hasError,
  };
};

export { useOptionsByBusinessUnit };
