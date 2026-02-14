import { MdInfoOutline } from "react-icons/md";
import {
  Button,
  Checkbox,
  Checkpicker,
  Icon,
  Input,
  Stack,
  Text,
} from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { LoadingPage } from "@design/feedback/loadingPage";
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
    payrollAdvanceOptions,
    payrollSpecialAdvanceOptions,
    creditBureausOptions,
    isLoadingEnums,
    onToggle,
    onButtonClick,
    onResetEdit,
    onInfoRefModal,
    onInfoObligModal,
    onInfoMethodsModal,
    onChangePayrollAdvance,
    onChangePayrollSpecialAdvance,
  } = props;

  return (
    <>
      {isLoadingEnums ||
      !payrollAdvanceOptions ||
      !payrollSpecialAdvanceOptions ? (
        <LoadingPage />
      ) : (
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
                          formik.values[
                            method.id as keyof typeof formik.values
                          ],
                        )}
                        onChange={onToggle}
                        value={method.value}
                      />
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="column" gap={tokens.spacing.s200}>
                  <Stack alignItems="center" gap={tokens.spacing.s050}>
                    <Text size="medium">{decisionsGenLabels.second}</Text>
                  </Stack>
                  <Stack
                    direction="column"
                    gap={tokens.spacing.s100}
                    margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                  >
                    {creditBureausOptions.map((creditBureau) => (
                      <Checkbox
                        key={creditBureau.id}
                        id={creditBureau.id}
                        name={creditBureau.id}
                        label={creditBureau.label}
                        checked={Boolean(
                          formik.values[
                            creditBureau.id as keyof typeof formik.values
                          ],
                        )}
                        onChange={onToggle}
                        value={creditBureau.value}
                      />
                    ))}
                  </Stack>
                </Stack>
                <ToggleGeneralDecision
                  name="additionalDebtors"
                  label={decisionsGenLabels.third}
                  isChecked={formik.values.additionalDebtors}
                  onToggle={onToggle}
                />
                <ToggleGeneralDecision
                  name="realGuarantees"
                  label={decisionsGenLabels.fourth}
                  isChecked={formik.values.realGuarantees}
                  onToggle={onToggle}
                  showIcon
                  onInfoModal={onInfoObligModal}
                />

                <Stack direction="column" gap={tokens.spacing.s150}>
                  <Text size="medium">{decisionsGenLabels.fifth}</Text>
                  <Stack
                    padding={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                  >
                    <Input
                      id="inquiryValidityPeriod"
                      name="inquiryValidityPeriod"
                      type="number"
                      value={formik.values.inquiryValidityPeriod}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Stack>
                </Stack>

                <ToggleGeneralDecision
                  name="toggleLineCreditPayrollAdvance"
                  label={decisionsGenLabels.sixth}
                  isChecked={formik.values.toggleLineCreditPayrollAdvance}
                  onToggle={onToggle}
                />
                {formik.values.toggleLineCreditPayrollAdvance === true && (
                  <Stack
                    direction="column"
                    padding={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                  >
                    <Checkpicker
                      label={decisionsGenLabels.which}
                      name="lineCreditPayrollAdvance"
                      onChange={onChangePayrollAdvance}
                      options={payrollAdvanceOptions}
                      values={formik.values.lineCreditPayrollAdvance}
                      fullwidth
                    />
                  </Stack>
                )}

                <ToggleGeneralDecision
                  name="toggleLineCreditPayrollSpecialAdvance"
                  label={decisionsGenLabels.seventh}
                  isChecked={
                    formik.values.toggleLineCreditPayrollSpecialAdvance
                  }
                  onToggle={onToggle}
                />

                {formik.values.toggleLineCreditPayrollSpecialAdvance ===
                  true && (
                  <Stack
                    direction="column"
                    padding={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                  >
                    <Checkpicker
                      label={decisionsGenLabels.which}
                      name="lineCreditPayrollSpecialAdvance"
                      onChange={onChangePayrollSpecialAdvance}
                      options={payrollSpecialAdvanceOptions}
                      values={formik.values.lineCreditPayrollSpecialAdvance}
                      fullwidth
                    />
                  </Stack>
                )}

                <Stack direction="column" gap={tokens.spacing.s150}>
                  <Text size="medium">{decisionsGenLabels.eighth}</Text>
                  <Stack
                    padding={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                  >
                    <Input
                      id="maximumNotifDocSize"
                      name="maximumNotifDocSize"
                      type="number"
                      value={formik.values.maximumNotifDocSize}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Stack>
                </Stack>
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
      )}
    </>
  );
};

export { DecisionsGeneralFormUI };
