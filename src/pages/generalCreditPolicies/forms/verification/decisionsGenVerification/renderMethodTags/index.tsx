import { Tag } from "@inubekit/inubekit";
import { ComponentAppearance } from "@enum/appearances";
import { verificationLabels } from "@config/generalCreditPolicies/assisted/verificationLabels";
import { IRenderMethodTags } from "@ptypes/generalCredPolicies/forms/IRenderMethodTags";

const RenderMethodTags = (props: IRenderMethodTags) => {
  const { reciprocity, factor, calculation } = props;
  const methods = [
    { condition: reciprocity, label: verificationLabels.reciprocity },
    { condition: factor, label: verificationLabels.factor },
    { condition: calculation, label: verificationLabels.calculation },
  ];

  const activeMethods = methods.filter((method) => method.condition);

  if (activeMethods.length === 0) {
    return (
      <Tag
        appearance={ComponentAppearance.DANGER}
        label={verificationLabels.noDefined}
        displayIcon={false}
      />
    );
  }

  return activeMethods.map((method) => (
    <Tag
      key={method.label}
      appearance={ComponentAppearance.GRAY}
      label={method.label}
      displayIcon={false}
    />
  ));
};

export { RenderMethodTags };
