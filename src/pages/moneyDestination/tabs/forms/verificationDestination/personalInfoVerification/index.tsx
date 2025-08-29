import { Stack } from "@inubekit/inubekit";
import { IPersonalInfoVerification } from "@ptypes/moneyDestination/tabs/IPersonalInfoVerification";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { normalizeNameDestination } from "@utils/destination/normalizeNameDestination";
import { personalInfoVeriflabels } from "@config/moneyDestination/moneyDestinationTab/form/personalInfoVeriflabels";

const RenderPersonalInfoVerification = (props: IPersonalInfoVerification) => {
  const { values } = props;
  return (
    <Stack width="100%" direction="column" gap={tokens.spacing.s200}>
      <BoxAttribute
        direction="column"
        label={personalInfoVeriflabels.nameDestination}
        value={
          normalizeNameDestination(values.nameDestination)?.name ??
          values.nameDestination
        }
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
