import { useState, useEffect } from "react";

import { getOptionsByBusinessUnit } from "@services/staffPortal/getOptionsByBusinessUnits";
import { IOptionsByBusinessUnits } from "@ptypes/staffPortal/IOptionsByBusinessUnits";
import { normalizeOptionsByPublicCode } from "@utils/optionByBusinessunit";
import { IUseOptionsByBusinessUnit } from "@ptypes/staffPortal/IUseOptionsByBusinessUnit";
import { t } from "i18next";

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

  const translationMap: Record<
    string,
    { titleKey: string; descriptionKey: string }
  > = {
    "Destinos de dinero": {
      titleKey: "mainMenuNavigation.moneyDestination",
      descriptionKey: "moneyDestination.descriptionPage",
    },
    "Nóminas de convenio": {
      titleKey: "mainMenuNavigation.payrollAgreement",
      descriptionKey: "payrollAgreement.descriptionPage",
    },
    "Politicas generales de credito": {
      titleKey: "mainMenuNavigation.generalCreditPolicies",
      descriptionKey: "generalCreditPolicies.descriptionPage",
    },
  };

  const optionsCards = optionsBusinessUnit
    .filter((option) => normalizeOptionsByPublicCode(option.publicCode))
    .map((option) => {
      const normalizedOption = normalizeOptionsByPublicCode(option.publicCode);
      const translationEntry = translationMap[option.publicCode];

      return {
        id: option.publicCode,
        publicCode: translationEntry
          ? t(translationEntry.titleKey)
          : option.abbreviatedName,
        description: translationEntry
          ? t(translationEntry.descriptionKey)
          : option.descriptionUse,
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
