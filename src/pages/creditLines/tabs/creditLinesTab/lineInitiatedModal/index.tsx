import { MdArrowBack, MdArrowForward, MdCheckCircle } from "react-icons/md";
import { createPortal } from "react-dom";
import { Blanket, Button, Icon, Stack, Text } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { portalId } from "@config/portalId";
import { lineInitiatedLabels } from "@config/creditLines/creditLinesTab/generic/lineInitiatedLabels";
import { ILineInitiatedModal } from "@ptypes/creditLines/ILineInitiatedModal";

const LineInitiatedModal = (props: ILineInitiatedModal) => {
  const { onGoBack, onGoContinue } = props;

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <BoxContainer
        width="500px"
        height="auto"
        direction="column"
        backgroundColor={EComponentAppearance.LIGHT}
        borderRadius={tokens.spacing.s100}
        borderColor={EComponentAppearance.DARK}
        padding={tokens.spacing.s300}
        gap={tokens.spacing.s300}
        boxSizing="border-box"
        alignItems="center"
      >
        <Icon
          icon={<MdCheckCircle />}
          appearance={EComponentAppearance.SUCCESS}
          size="50px"
        />
        <Text type="title" size="large" weight="bold">
          {lineInitiatedLabels.title}
        </Text>
        <Text size="large" appearance={EComponentAppearance.GRAY}>
          {lineInitiatedLabels.subtitle}
        </Text>

        <BoxContainer
          width="452px"
          height="auto"
          direction="column"
          backgroundColor={EComponentAppearance.LIGHT}
          borderRadius={tokens.spacing.s100}
          borderColor={EComponentAppearance.DARK}
          padding={tokens.spacing.s200}
          gap={tokens.spacing.s150}
          boxSizing="border-box"
        >
          <Text type="label" size="large" weight="bold">
            {lineInitiatedLabels.titleFirstBox}
          </Text>
          <Text size="medium" appearance={EComponentAppearance.GRAY}>
            {lineInitiatedLabels.descriptionFirst}
          </Text>
          <Stack justifyContent="flex-end">
            <Button
              onClick={onGoBack}
              iconBefore={<MdArrowBack />}
              variant="outlined"
            >
              {lineInitiatedLabels.goBackButton}
            </Button>
          </Stack>
        </BoxContainer>
        <BoxContainer
          width="452px"
          height="auto"
          direction="column"
          backgroundColor={EComponentAppearance.LIGHT}
          borderRadius={tokens.spacing.s100}
          borderColor={EComponentAppearance.DARK}
          padding={tokens.spacing.s200}
          gap={tokens.spacing.s150}
          boxSizing="border-box"
        >
          <Text type="label" size="large" weight="bold">
            {lineInitiatedLabels.titleSecondBox}
          </Text>
          <Text size="medium" appearance={EComponentAppearance.GRAY}>
            {lineInitiatedLabels.descriptionSecond}
          </Text>
          <Stack justifyContent="flex-end">
            <Button
              onClick={onGoContinue}
              iconBefore={<MdArrowForward />}
              variant="outlined"
            >
              {lineInitiatedLabels.continueButton}
            </Button>
          </Stack>
        </BoxContainer>
      </BoxContainer>
    </Blanket>,
    node,
  );
};

export { LineInitiatedModal };
