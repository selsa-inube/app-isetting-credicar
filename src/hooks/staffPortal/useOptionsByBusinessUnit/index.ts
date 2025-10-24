import { useState, useEffect, useContext, useMemo } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getOptionsByBusinessUnit } from "@services/staffPortal/getOptionsByBusinessUnits";
import { IOptionsByBusinessUnits } from "@ptypes/staffPortal/IOptionsByBusinessUnits";
import { getIcon } from "@utils/getIcon";
import { normalizeOptionsByPublicCode } from "@utils/optionByBusinessunit";
import { IUseOptionsByBusinessUnit } from "@ptypes/staffPortal/IUseOptionsByBusinessUnit";

const useOptionsByBusinessUnit = (props: IUseOptionsByBusinessUnit) => {
  const { businessUnit, staffPortalId, optionName } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [optionsBusinessUnit, setOptionsBusinessUnit] = useState<
    IOptionsByBusinessUnits[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchOptionBusinessUnitData = async () => {
      const businessUnitSigla = JSON.parse(businessUnit ?? "{}");

      if (!businessUnitSigla.publicCode || staffPortalId.length === 0) {
        setOptionsBusinessUnit([]);
        setHasError(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setHasError(false);

      try {
        const data = await getOptionsByBusinessUnit(
          businessUnitSigla.publicCode,
          staffPortalId,
          appData.user.userAccount,
        );
        setOptionsBusinessUnit(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setOptionsBusinessUnit([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionBusinessUnitData();
  }, [businessUnit, staffPortalId, appData.user.userAccount]);

  const optionsCards = useMemo(() => {
    if (hasError) {
      return [];
    }

    const cards = optionsBusinessUnit
      .filter((option) => normalizeOptionsByPublicCode(option.publicCode))
      .map((option) => {
        const normalizedOption = normalizeOptionsByPublicCode(
          option.publicCode,
        );
        return {
          id: option.publicCode,
          publicCode: option.abbreviatedName,
          description: option.descriptionUse,
          icon: getIcon(option.iconReference, 22, false) ?? "",
          url: normalizedOption?.url ?? "",
        };
      });
    return cards;
  }, [hasError, optionsBusinessUnit]);

  const descriptionOptions = useMemo(() => {
    return optionName
      ? optionsCards.find((option) => option.publicCode === optionName)
      : undefined;
  }, [optionName, optionsCards]);

  return {
    optionsCards,
    optionsBusinessUnit,
    descriptionOptions,
    loading,
    hasError,
  };
};

export { useOptionsByBusinessUnit };
