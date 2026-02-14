import { useContext } from "react";
import { Tag } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { EComponentAppearance } from "@enum/appearances";
import { ENameRules } from "@enum/nameRules";
import { ECreditLines } from "@enum/creditLines";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { IRenderCreditBurTags } from "@ptypes/generalCredPolicies/forms/IRenderCreditBurTags";
import { IServerDomain } from "@ptypes/IServerDomain";

const RenderCreditBurTags = (props: IRenderCreditBurTags) => {
  const { datacreditoExperian, transunion } = props;

  const { appData } = useContext(AuthAndPortalData);

  const { ruleData, loadingList: loading } = useEnumRules({
    enumDestination: ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED,
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const labels = (rule: string) => {
    return (
      ruleData.listOfPossibleValues?.list as unknown as IServerDomain[]
    )?.find((item: IServerDomain) => item.id === rule)?.label;
  };

  const creditBureous = [
    {
      condition: datacreditoExperian,
      label: labels("DATACREDITO_EXPERIAN"),
    },
    {
      condition: transunion,
      label: labels("TRANSUNION"),
    },
  ];

  const activeCreditBureous = creditBureous.filter(
    (method) => method.condition,
  );
  if (!loading) {
    if (activeCreditBureous.length === 0) {
      return (
        <Tag
          appearance={EComponentAppearance.DANGER}
          label={verificationLabels.noDefined}
          displayIcon={false}
        />
      );
    }

    return activeCreditBureous.map((method, index) => (
      <Tag
        key={method.label ?? index}
        appearance={EComponentAppearance.GRAY}
        label={method.label ?? ""}
        displayIcon={false}
      />
    ));
  }
};

export { RenderCreditBurTags };
