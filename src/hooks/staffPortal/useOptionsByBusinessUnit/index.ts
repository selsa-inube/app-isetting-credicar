import { useState, useEffect, useContext } from "react";

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
      if (staffPortalId.length > 0) {
        setLoading(true);
        try {
          const businessUnitSigla = JSON.parse(businessUnit ?? "{}");

          const data = await getOptionsByBusinessUnit(
            businessUnitSigla.publicCode,
            staffPortalId,
            appData.user.userAccount,
          );
          setOptionsBusinessUnit(data);
        } catch (error) {
          console.info(error);
          setHasError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOptionBusinessUnitData();
  }, [businessUnit, staffPortalId]);

  const optionsCards = optionsBusinessUnit
    .filter((option) => normalizeOptionsByPublicCode(option.publicCode))
    .map((option) => {
      const normalizedOption = normalizeOptionsByPublicCode(option.publicCode);
      return {
        id: option.publicCode,
        publicCode: option.abbreviatedName,
        description: option.descriptionUse,
        icon: getIcon(option.iconReference, 22, false) ?? "",
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
