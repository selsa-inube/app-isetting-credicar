import { Assisted, Breadcrumbs, Stack } from "@inubekit/inubekit";

import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { crumbsAddPayrollAgreement } from "@config/payrollAgreement/payrollAgreementTab/navigation";
import { DecisionModal } from "@design/modals/decisionModal";
import { goBackModal } from "@config/goBackModal";
import { IAddPayrollAgreementUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IAddPayrollAgreementUI";
import { CompanyForm } from "@pages/payrollAgreement/tabs/forms/companyPayrollAgreement";
import { RegularPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/regularPaymentCycles";
import { ExtraordinaryPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/extraordinaryPaymentCycles";
import { VerificationForm } from "@pages/payrollAgreement/tabs/forms/verificationPayrollAgreement";
import { GeneralInformationPayrollForm } from "@pages/payrollAgreement/tabs/forms/generalInfoPayrollAgreement";
import { addPayrollLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/addPayrollLabels";
import { controlsAssisted } from "@config/controlsAssisted";

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
    showGoBackModal,
    showModal,
    showPendingReqModal,
    showRequestProcessModal,
    smallScreen,
    sourcesOfIncomeValues,
    steps,
    typeRegularPayroll,
    includeExtraPayDay,
    regularDeleted,
    onCloseModal,
    onClosePendingReqModal,
    onCloseRequestStatus,
    onFinishForm,
    onGoBack,
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
          />
          <Stack direction="column">
            {currentStep === 1 && (
              <CompanyForm
                ref={formReferences.company}
                initialValues={initialGeneralInformationValues.company.values}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
              />
            )}
            {currentStep === 2 && (
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
            {currentStep === 3 && (
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
            {currentStep === 4 && (
              <ExtraordinaryPaymentCyclesForm
                extraordinaryPayment={extraordinaryPayment}
                setExtraordinaryPayment={setExtraordinaryPayment}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                typeRegularPayroll={typeRegularPayroll}
                regularPaymentCycles={includeExtraPayDay}
                regularDeleted={regularDeleted}
              />
            )}
            {currentStep === 5 && (
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
                showPendingReqModal={showPendingReqModal}
                onClosePendingReqModal={onClosePendingReqModal}
                typeRegularPayroll={typeRegularPayroll}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      {showGoBackModal && (
        <DecisionModal
          portalId="portal"
          title={goBackModal.title}
          description={goBackModal.description}
          actionText={goBackModal.actionText}
          onCloseModal={onCloseModal}
          onClick={onGoBack}
        />
      )}
    </Stack>
  );
};

export { AddPayrollAgreementUI };
