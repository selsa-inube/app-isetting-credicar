import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { useState } from "react";
import { Blanket, Button, Icon, Stack, Text } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { StyledModalContainer } from "@design/modals/modalWrapper/styles";
import { BoxContainer } from "@design/layout/boxContainer";
import { infoConfigurationLabels } from "@config/creditLines/creditLinesTab/generic/infoConfigurationLabels";
import { infoErrorModal } from "@config/creditLines/generic/infoErrorModal";
import { portalId } from "@config/portalId";
import { IAppearenceBoxContainer } from "@ptypes/IAppearenceBoxContainer";
import { ISubmitRequestModal } from "@ptypes/creditLines/ISubmitRequestModal";
import { InformationBox } from "../creditLinesTab/InformationBox";

const SubmitRequestModal = (props: ISubmitRequestModal) => {
  const {
    title,
    unconfiguredRules,
    description,
    loading,
    language,
    appearanceItemIcon,
    itemIcon,
    editOption,
    onClick,
    onCloseModal,
  } = props;

  const [descriptionError, setDescriptionError] = useState<string>("");
  const [showDecisionModal, setShowDecisionModal] = useState<boolean>(false);

  const onClickInfo = (error?: string) => {
    if (editOption) return;
    setDescriptionError(error || "");
    setShowDecisionModal(!showDecisionModal);
  };

  const onCloseDecisionModal = () => {
    if (editOption) return;
    setShowDecisionModal(!showDecisionModal);
    setDescriptionError("");
  };

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <StyledModalContainer changeZIndex={true} valueZIndex={4}>
      <Blanket>
        <BoxContainer
          width="500px"
          height="auto"
          direction="column"
          backgroundColor={EComponentAppearance.LIGHT}
          borderRadius={tokens.spacing.s100}
          borderColor={EComponentAppearance.DARK}
          padding={tokens.spacing.s300}
          boxSizing="border-box"
        >
          <Stack direction="column" gap={tokens.spacing.s200}>
            <Stack justifyContent="space-between">
              <Text type="title" size="medium" weight="bold">
                {title}
              </Text>

              <Button
                spacing="compact"
                appearance={EComponentAppearance.DARK}
                variant="none"
                onClick={onCloseModal}
                iconAfter={
                  <Icon
                    appearance={EComponentAppearance.DARK}
                    icon={<MdClear />}
                  />
                }
              >
                {infoConfigurationLabels.close}
              </Button>
            </Stack>

            <Text size="medium" appearance={EComponentAppearance.GRAY}>
              {description}
            </Text>

            <BoxContainer
              width="100%"
              height="250px"
              direction="column"
              backgroundColor={EComponentAppearance.LIGHT}
              boxSizing="border-box"
              gap={tokens.spacing.s100}
              overflowY="auto"
            >
              {unconfiguredRules.map((rule, index) => (
                <InformationBox
                  key={index}
                  icon={itemIcon}
                  appearanceIcon={appearanceItemIcon}
                  description={
                    rule.ruleName[language as keyof typeof rule.ruleName] ?? ""
                  }
                  descriptionModal={
                    rule.errorMessage[
                      language as keyof typeof rule.errorMessage
                    ]
                  }
                  boxPadding={tokens.spacing.s100}
                  boxColor={appearanceItemIcon as IAppearenceBoxContainer}
                  sizeIcon="16px"
                  sizeDescription="medium"
                  ellipsisText
                  heigthBox="auto"
                  setDescriptionError={setDescriptionError}
                  onClickInfo={onClickInfo}
                  withCursor={false}
                />
              ))}
            </BoxContainer>

            <Stack justifyContent="flex-end" gap={tokens.spacing.s100}>
              <Button
                onClick={onCloseModal}
                variant="filled"
                spacing="compact"
                appearance={EComponentAppearance.GRAY}
              >
                {infoConfigurationLabels.close}
              </Button>
              <Button
                onClick={onClick}
                variant="filled"
                spacing="compact"
                loading={loading}
                appearance={EComponentAppearance.PRIMARY}
              >
                {infoConfigurationLabels.send}
              </Button>
            </Stack>
          </Stack>

          {showDecisionModal && (
            <DecisionModal
              portalId={portalId}
              title={infoErrorModal.title}
              actionText={infoErrorModal.actionText}
              description={descriptionError}
              onCloseModal={onCloseDecisionModal}
              onClick={onCloseDecisionModal}
              withCancelButton={false}
            />
          )}
        </BoxContainer>
      </Blanket>
    </StyledModalContainer>,
    node,
  );
};

export { SubmitRequestModal };
