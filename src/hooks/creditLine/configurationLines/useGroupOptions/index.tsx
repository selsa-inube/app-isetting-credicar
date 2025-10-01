import { useEnumAllRulesConfiguration } from "@hooks/useEnumAllRulesConfiguration";
import { ECreditLines } from "@enum/creditLines";
import { options } from "@config/creditLines/configuration/mainOptions";
import { toLinksArray } from "@utils/toLinksArray";
import { filterNavConfiguration } from "@utils/filterNavConfiguration";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

const useGroupOptions = () => {
  const ruleCatalog = ECreditLines.RULE_CATALOG;
  const catalogAction = ECreditLines.CATALOG_ACTION;

  const { optionsAllRules } = useEnumAllRulesConfiguration({
    ruleCatalog,
    catalogAction,
  });

  const amortizationOptions = filterNavConfiguration(
    options.AmortizationCollectionDebt.links,
    optionsAllRules as INavigationRule[],
  );

  const conditionsUseProductOptions = filterNavConfiguration(
    options.conditionsUseProduct.links,
    optionsAllRules as INavigationRule[],
  );

  const settingCrediLimitOptions = filterNavConfiguration(
    options.settingCrediLimit.links,
    optionsAllRules as INavigationRule[],
  );

  const costsClientOptions = filterNavConfiguration(
    options.costsClientWithinQuota.links,
    optionsAllRules as INavigationRule[],
  );

  const creditStudyProcessingOptions = filterNavConfiguration(
    options.creditStudyProcessing.links,
    optionsAllRules as INavigationRule[],
  );

  const requiredGuaranteesOptions = filterNavConfiguration(
    options.requiredGuarantees.links,
    optionsAllRules as INavigationRule[],
  );

  const productRequirementsOptions = filterNavConfiguration(
    options.productRequirements.links,
    optionsAllRules as INavigationRule[],
  );

  const groups = [
    {
      id: "lineNamesAndDescriptions",
      title: "Nombres y descripción de la línea",
      path: "/credit-lines/edit-credit-lines/line-Names-Descriptions",
      links: toLinksArray(options.lineNamesAndDescriptions),
    },
    {
      id: "AmortizationCollectionDebt",
      title: "Amortización y recaudo de la deuda",
      links: toLinksArray(amortizationOptions),
    },
    {
      id: "clientsSupportedByLine",
      title: "Clientes que soporta la línea",
      path: "/credit-lines/edit-credit-lines/clients-supported",
      links: toLinksArray(options.clientsSupportedByLine),
    },
    {
      id: "conditionsUseProduct",
      title: "Condiciones de uso del producto",
      links: toLinksArray(conditionsUseProductOptions),
    },
    {
      id: "settingCreditLimit",
      title: "Configuración del cupo de crédito",
      links: toLinksArray(settingCrediLimitOptions),
    },
    {
      id: "costsClientWithinQuota",
      title: "Costos para el cliente dentro de la cuota",
      links: toLinksArray(costsClientOptions),
    },
    {
      id: "creditStudyProcessing",
      title: "Estudio y trámite de crédito",
      links: toLinksArray(creditStudyProcessingOptions),
    },
    {
      id: "requiredGuarantees",
      title: "Garantías requeridas",
      links: toLinksArray(requiredGuaranteesOptions),
    },
    {
      id: "productRequirements",
      title: "Requisitos del producto",
      links: toLinksArray(productRequirementsOptions),
    },
  ] as const;

  return {
    groups,
  };
};

export { useGroupOptions };
