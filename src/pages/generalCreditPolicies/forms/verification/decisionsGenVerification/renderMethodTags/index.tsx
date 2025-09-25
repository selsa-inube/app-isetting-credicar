import { useContext } from "react";
import { Tag } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { EComponentAppearance } from "@enum/appearances";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { IRenderMethodTags } from "@ptypes/generalCredPolicies/forms/IRenderMethodTags";
import { IEnumerators } from "@ptypes/IEnumerators";

const RenderMethodTags = (props: IRenderMethodTags) => {
  const {
    PaymentCapacityBasedCreditLimit,
    ReciprocityBasedCreditLimit,
    RiskAnalysisBasedCreditLimit,
  } = props;

  const { appData } = useContext(AuthAndPortalData);

  const { enumData: enumMethods } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EPayrollAgreement.METHODS,
  });

  const labels = (method: string) => {
    const enumObject = enumMethods.find(
      (item: IEnumerators) => item.code === method,
    );

    if (enumObject) {
      return (
        enumObject.i18n?.[appData.language as keyof typeof enumObject.i18n] ??
        enumObject.description
      );
    }

    return "";
  };

  const methods = [
    {
      condition: ReciprocityBasedCreditLimit,
      label: labels("ReciprocityBasedCreditLimit"),
    },
    {
      condition: RiskAnalysisBasedCreditLimit,
      label: labels("RiskAnalysisBasedCreditLimit"),
    },
    {
      condition: PaymentCapacityBasedCreditLimit,
      label: labels("PaymentCapacityBasedCreditLimit"),
    },
  ];

  const activeMethods = methods.filter((method) => method.condition);

  if (activeMethods.length === 0) {
    return (
      <Tag
        appearance={EComponentAppearance.DANGER}
        label={verificationLabels.noDefined}
        displayIcon={false}
      />
    );
  }

  return activeMethods.map((method) => (
    <Tag
      key={method.label}
      appearance={EComponentAppearance.GRAY}
      label={method.label ?? ""}
      displayIcon={false}
    />
  ));
};

export { RenderMethodTags };
