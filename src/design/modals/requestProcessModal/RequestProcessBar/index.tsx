import { MdCheckCircle } from "react-icons/md";
import { Icon, ProgressBar, Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { countVerifiedRequests } from "@utils/countVerifiedRequests";
import { verifiedErrorRequest } from "@utils/verifiedErrorRequest";

import {
  StyledContainerFields,
  StyledContainerProgressBar,
  StyledStepIndicator,
} from "../styles";
import { IRequestProcess } from "@ptypes/design/IRequestProcess";

const RequestProcessBar = (props: IRequestProcess) => {
  const { requestSteps, percentage, sizeIcon, stepCurrent, stepCurrentIndex } =
    props;

  const appearance =
    requestSteps[stepCurrentIndex].status === "error"
      ? ComponentAppearance.DANGER
      : ComponentAppearance.SUCCESS;

  const isError = requestSteps[stepCurrentIndex].status === "error";

  const appearanceProgressBar = verifiedErrorRequest(requestSteps)
    ? ComponentAppearance.DANGER
    : ComponentAppearance.SUCCESS;

  const numberOfSteps = `${stepCurrent}/${requestSteps.length}`;

  const Showicon = stepCurrent === requestSteps.length;

  return (
    <StyledContainerFields>
      <Stack
        direction="column"
        gap={tokens.spacing.s100}
        width="100%"
        alignItems="center"
      >
        <Stack gap={tokens.spacing.s100} alignItems="center" width="100%">
          {Showicon ? (
            <Icon
              icon={<MdCheckCircle />}
              size={sizeIcon}
              appearance={appearance}
            />
          ) : (
            <StyledStepIndicator $statusError={isError}>
              <Text
                type="label"
                size="medium"
                appearance={appearance}
                weight="bold"
              >
                {stepCurrent}
              </Text>
            </StyledStepIndicator>
          )}

          <Text
            size="medium"
            appearance={ComponentAppearance.DARK}
            weight="bold"
            ellipsis
          >
            {requestSteps[stepCurrentIndex].name}
          </Text>
        </Stack>
        <Stack width="100%" gap={tokens.spacing.s100} alignItems="center">
          <StyledContainerProgressBar
            $appearance={ComponentAppearance.GRAY}
            $height="8px"
          >
            <ProgressBar
              height="8px"
              appearance={appearanceProgressBar}
              progress={countVerifiedRequests(requestSteps)}
            />
          </StyledContainerProgressBar>
          <Text type="label" size="medium" weight="bold">
            {numberOfSteps}
          </Text>
        </Stack>
        <Text type="label" size="large" appearance={ComponentAppearance.GRAY}>
          {percentage}
        </Text>
      </Stack>
    </StyledContainerFields>
  );
};

export { RequestProcessBar };
