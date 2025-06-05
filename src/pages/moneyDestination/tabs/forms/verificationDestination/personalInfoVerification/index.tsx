import { Stack } from "@inubekit/inubekit";
import { IPersonalInfoVerification } from "@ptypes/moneyDestination/tabs/IPersonalInfoVerification";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { personalInfoVeriflabels } from "@config/moneyDestination/moneyDestinationTab/form/personalInfoVeriflabels";
import { tokens } from "@design/tokens";

const RenderPersonalInfoVerification = (props: IPersonalInfoVerification) => {
  const { values } = props;
  return (
    <Stack width="100%" direction="column" gap={tokens.spacing.s200}>
      <BoxAttribute
        direction="column"
        label={personalInfoVeriflabels.nameDestination}
        value={values.nameDestination}
      />
      <BoxAttribute
        direction="column"
        label={personalInfoVeriflabels.description}
        value={values.description}
      />
    </Stack>
  );
};

export { RenderPersonalInfoVerification };
