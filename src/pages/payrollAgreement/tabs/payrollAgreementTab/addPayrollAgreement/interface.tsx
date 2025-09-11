import { Assisted, Breadcrumbs, Stack } from "@inubekit/inubekit";

import { CompanyForm } from "@pages/payrollAgreement/tabs/forms/companyPayrollAgreement";
import { RegularPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/regularPaymentCycles";
import { ExtraordinaryPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/extraordinaryPaymentCycles";
import { VerificationForm } from "@pages/payrollAgreement/tabs/forms/verificationPayrollAgreement";
import { GeneralInformationPayrollForm } from "@pages/payrollAgreement/tabs/forms/generalInfoPayrollAgreement";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { stepKeysPayroll } from "@enum/stepsKeysPayroll";
import { crumbsAddPayrollAgreement } from "@config/payrollAgreement/payrollAgreementTab/navigation";
import { addPayrollLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/addPayrollLabels";
import { controlsAssisted } from "@config/controlsAssisted";
import { portalId } from "@config/portalId";
import { IAddPayrollAgreementUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IAddPayrollAgreementUI";

const AddPayrollAgreementUI = (props: IAddPayrollAgreementUI) => {
  const {
    currentStep,
    extraordinaryPayment,
    formReferences,
    formValid,
    initialGeneralInformationValues,
    isCurrentFormValid,
    loading,
    regularPaymentCycles,
    requestSteps,
    savePayrollAgreement,
    showModal,
    showPendingRequestModal,
    showRequestProcessModal,
    smallScreen,
    sourcesOfIncomeValues,
    steps,
    typeRegularPayroll,
    includeExtraPayDay,
    showDecision,
    modalData,
    onClosePendingRequestModal,
    onCloseRequestStatus,
    onFinishForm,
    onNextStep,
    onOpenModal,
    onPreviousStep,
    onToggleModal,
    setCurrentStep,
    setExtraordinaryPayment,
    setIsCurrentFormValid,
    setRegularPaymentCycles,
    setRegularDeleted,
    setIncludeExtraPayDay,
    setSourcesOfIncomeValues,
    onCloseProcess,
  } = props;

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s300} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s300} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsAddPayrollAgreement} />
          <Title
            title={addPayrollLabels.title}
            description={addPayrollLabels.description}
            sizeTitle="large"
            onClick={onOpenModal}
          />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Assisted
            step={steps[currentStep - 1]}
            totalSteps={steps.length}
            onBackClick={onPreviousStep}
            onNextClick={onNextStep}
            onSubmitClick={onToggleModal}
            disableNext={formValid}
            controls={controlsAssisted}
            size={smallScreen ? "small" : "large"}
            showCurrentStepNumber={false}
          />
          <Stack direction="column">
            {currentStep === stepKeysPayroll.COMPANY && (
              <CompanyForm
                ref={formReferences.company}
                initialValues={initialGeneralInformationValues.company.values}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
              />
            )}
            {currentStep === stepKeysPayroll.GENERAL_INFO && (
              <GeneralInformationPayrollForm
                ref={formReferences.generalInformation}
                initialValues={
                  initialGeneralInformationValues.generalInformation.values
                }
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                sourcesOfIncomeValues={sourcesOfIncomeValues}
                setSourcesOfIncomeValues={setSourcesOfIncomeValues}
              />
            )}
            {currentStep === stepKeysPayroll.REGULAR_CYCLES && (
              <RegularPaymentCyclesForm
                regularPaymentCycles={regularPaymentCycles}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                setRegularPaymentCycles={setRegularPaymentCycles}
                setIncludeExtraPayDay={setIncludeExtraPayDay}
                setRegularDeleted={setRegularDeleted}
              />
            )}
            {currentStep === stepKeysPayroll.EXTRAORDINARY_CYCLES && (
              <ExtraordinaryPaymentCyclesForm
                extraordinaryPayment={extraordinaryPayment}
                setExtraordinaryPayment={setExtraordinaryPayment}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                typeRegularPayroll={typeRegularPayroll}
                regularPaymentCycles={includeExtraPayDay}
              />
            )}
            {currentStep === stepKeysPayroll.VERIFICATION && (
              <VerificationForm
                updatedData={{
                  company: {
                    isValid: isCurrentFormValid,
                    values: initialGeneralInformationValues.company.values,
                  },
                  generalInformation: {
                    isValid: isCurrentFormValid,
                    values:
                      initialGeneralInformationValues.generalInformation.values,
                  },
                  ordinaryCycles: {
                    isValid: formValid,
                    values: regularPaymentCycles,
                  },
                  extraordinaryCycles: {
                    isValid: formValid,
                    values: extraordinaryPayment,
                  },
                }}
                requestSteps={requestSteps}
                onPreviousStep={onPreviousStep}
                handleStepChange={(stepId) => setCurrentStep(stepId)}
                showModal={showModal}
                showRequestProcessModal={showRequestProcessModal}
                onToggleModal={onToggleModal}
                onFinishForm={onFinishForm}
                savePayrollAgreement={savePayrollAgreement}
                loading={loading}
                onCloseRequestStatus={onCloseRequestStatus}
                showPendingRequestModal={showPendingRequestModal}
                onClosePendingRequestModal={onClosePendingRequestModal}
                typeRegularPayroll={typeRegularPayroll}
                onCloseProcess={onCloseProcess}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </Stack>
  );
};

export { AddPayrollAgreementUI };
