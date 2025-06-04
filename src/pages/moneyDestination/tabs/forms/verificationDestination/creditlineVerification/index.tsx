import { IRuleDecision } from "@isettingkit/input";
import { Stack, Tag, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { creditlineVerifLabels } from "@config/moneyDestination/moneyDestinationTab/form/creditlineVerifLabels";
import { ComponentAppearance } from "@enum/appearances";
import { ICreditlineVerification } from "@ptypes/moneyDestination/tabs/ICreditlineVerification";
import {
  StyledAttribute,
  StyledConatinerAttribute,
} from "../verificationBoxes/styles";

const RenderCreditlineVerification = (props: ICreditlineVerification) => {
  const { values } = props;

  const hasValues = values && values.length > 0;

  const labelTag = (decision: IRuleDecision) =>
    typeof decision.value === "object"
      ? JSON.stringify(decision.value)
      : String(decision.value);
  return (
    <StyledConatinerAttribute>
      <Stack
        padding={`${tokens.spacing.s0} ${tokens.spacing.s200}`}
        direction="column"
      >
        <Text
          type="label"
          appearance={ComponentAppearance.DARK}
          weight="bold"
          size="small"
        >
          {creditlineVerifLabels.creditLine}
        </Text>
      </Stack>
      <StyledAttribute>
        {hasValues ? (
          <>
            {values.map((decision, index) => (
              <Tag
                key={index}
                appearance={ComponentAppearance.GRAY}
                label={labelTag(decision)}
                displayIcon={false}
              />
            ))}
          </>
        ) : (
          <Tag
            appearance={ComponentAppearance.DANGER}
            label={creditlineVerifLabels.notCreditLine}
          />
        )}
      </StyledAttribute>
    </StyledConatinerAttribute>
  );
};

export { RenderCreditlineVerification };
