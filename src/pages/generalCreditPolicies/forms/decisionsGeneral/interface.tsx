import { MdInfoOutline } from "react-icons/md";
import { Button, Checkbox, Icon, Stack, Text } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { decisionsGenLabels } from "@config/generalCreditPolicies/assisted/decisionsGenLabels";
import { IDecisionsGeneralFormUI } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralFormUI";
import { infoObligationModal } from "@config/generalCreditPolicies/generic/infoObligationModal";
import { infoReferenceModal } from "@config/generalCreditPolicies/generic/infoReferenceModal";
import { infoMethodsModal } from "@config/generalCreditPolicies/generic/infoMethodsModal";
import { portalId } from "@config/portalId";
import { StyledFormContent } from "./styles";
import { ToggleGeneralDecision } from "./toggleGeneralDecision";

const DecisionsGeneralFormUI = (props: IDecisionsGeneralFormUI) => {
  const {
    formik,
    loading,
    editDataOption,
    isDisabledButton,
    showInformationReferenceModal,
    showInformationMethodModal,
    showInformationObligationModal,
    isMobile,
    buttonLabel,
    methodsOptions,
    onToggle,
    onButtonClick,
    onResetEdit,
    onInfoRefModal,
    onInfoObligModal,
    onInfoMethodsModal,
  } = props;

  return (
    <BoxContainer
      direction="column"
      gap={tokens.spacing.s250}
      minHeight="55vh"
      boxSizing="initial"
    >
      <StyledFormContent>
        <Stack direction="column">
          <BoxContainer
            direction="column"
            borderColor={EComponentAppearance.DARK}
            borderRadius={tokens.spacing.s100}
            width="auto"
            gap={tokens.spacing.s300}
            backgroundColor={EComponentAppearance.LIGHT}
            boxSizing="border-box"
            padding={
              isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
            }
          >
            <Stack direction="column" gap={tokens.spacing.s200}>
              <Stack alignItems="center" gap={tokens.spacing.s050}>
                <Text size="medium">{decisionsGenLabels.first}</Text>
                <Icon
                  icon={<MdInfoOutline />}
                  appearance={EComponentAppearance.PRIMARY}
                  onClick={onInfoMethodsModal}
                  size="12px"
                  cursorHover
                />
              </Stack>
              <Stack
                direction="column"
                gap={tokens.spacing.s100}
                margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
              >
                {methodsOptions.map((method) => (
                  <Checkbox
                    key={method.id}
                    id={method.id}
                    name={method.id}
                    label={method.label}
                    checked={Boolean(
                      formik.values[method.id as keyof typeof formik.values],
                    )}
                    onChange={onToggle}
                    value={method.value}
                  />
                ))}
              </Stack>
            </Stack>
            <ToggleGeneralDecision
              name="additionalDebtors"
              label={decisionsGenLabels.second}
              isChecked={formik.values.additionalDebtors}
              onToggle={onToggle}
            />
            <ToggleGeneralDecision
              name="realGuarantees"
              label={decisionsGenLabels.third}
              isChecked={formik.values.realGuarantees}
              onToggle={onToggle}
              showIcon
              onInfoModal={onInfoObligModal}
            />
          </BoxContainer>
        </Stack>
      </StyledFormContent>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        {editDataOption && (
          <Button
            onClick={onResetEdit}
            variant="outlined"
            appearance={EComponentAppearance.GRAY}
          >
            {decisionsGenLabels.buttonCancelLabel}
          </Button>
        )}

        <Button
          onClick={onButtonClick}
          disabled={isDisabledButton}
          loading={loading}
          appearance={EComponentAppearance.PRIMARY}
        >
          {buttonLabel}
        </Button>
      </Stack>
      {showInformationReferenceModal && (
        <DecisionModal
          portalId={portalId}
          title={infoReferenceModal.title}
          description={infoReferenceModal.description}
          actionText={infoReferenceModal.actionText}
          withIcon
          withCancelButton={false}
          icon={<MdInfoOutline />}
          onCloseModal={onInfoRefModal}
          onClick={onInfoRefModal}
        />
      )}
      {showInformationMethodModal && (
        <DecisionModal
          portalId={portalId}
          title={infoMethodsModal.title}
          description={infoMethodsModal.description}
          actionText={infoMethodsModal.actionText}
          withIcon
          withCancelButton={false}
          icon={<MdInfoOutline />}
          onCloseModal={onInfoMethodsModal}
          onClick={onInfoMethodsModal}
        />
      )}
      {showInformationObligationModal && (
        <DecisionModal
          portalId={portalId}
          title={infoObligationModal.title}
          description={infoObligationModal.description}
          actionText={infoObligationModal.actionText}
          withIcon
          withCancelButton={false}
          icon={<MdInfoOutline />}
          onCloseModal={onInfoObligModal}
          onClick={onInfoObligModal}
        />
      )}
    </BoxContainer>
  );
};

export { DecisionsGeneralFormUI };
