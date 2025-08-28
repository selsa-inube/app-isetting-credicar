import { Breadcrumbs, Stack, Tabs } from "@inubekit/inubekit";

import { GeneralInformationPayrollForm } from "@pages/payrollAgreement/tabs/forms/generalInfoPayrollAgreement";
import { RegularPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/regularPaymentCycles";
import { ExtraordinaryPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/extraordinaryPaymentCycles";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { DecisionModal } from "@design/modals/decisionModal";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { requestProcessMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestProcessMessage";
import { crumbsEditPayrollAgreement } from "@config/payrollAgreement/payrollAgreementTab/edit/navigation";
import { editPayrollLabels } from "@config/payrollAgreement/payrollAgreementTab/edit/editPayrollLabels";
import { portalId } from "@config/portalId";
import { IEditPayrollAgreementUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IEditPayrollAgreementUI";

const EditPayrollAgreementUI = (props: IEditPayrollAgreementUI) => {
  const {
    formReferences,
    formValues,
    isSelected,
    initialValues,
    smallScreen,
    sourcesOfIncomeValues,
    companyAgreement,
    showRequestProcessModal,
    savePayrollAgreement,
    showRequestStatus,
    requestSteps,
    regularPaymentCycles,
    typeRegularPayroll,
    extraordinaryPayment,
    showGeneralInfPayrollForm,
    showRegularPaymentCyclesForm,
    showExtraPaymentCyclesForm,
    filteredTabs,
    modalData,
    titleRequest,
    descriptionRequest,
    actionTextRequest,
    showDecision,
    setIncludeExtraPayDay,
    setRegularDeleted,
    setExtraordinaryPayment,
    setRegularPaymentCycles,
    onTabChange,
    handleOpenModal,
    onReset,
    setIsCurrentFormValid,
    setSourcesOfIncomeValues,
    onCloseRequestStatus,
    onClosePendingRequestModal,
    onToggleEditedModal,
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
          <Breadcrumbs crumbs={crumbsEditPayrollAgreement} />
          <Title
            title={editPayrollLabels.title}
            description={editPayrollLabels.description}
            sizeTitle="large"
            navigatePage="/payroll-agreement"
            onClick={handleOpenModal}
          />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Tabs
            tabs={filteredTabs}
            selectedTab={isSelected}
            onChange={onTabChange}
            scroll={smallScreen ? true : false}
          />
          <Stack direction="column">
            {showGeneralInfPayrollForm && (
              <GeneralInformationPayrollForm
                ref={formReferences}
                initialValues={formValues.generalInformation.values}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onToggleEditedModal}
                onReset={onReset}
                sourcesOfIncomeValues={sourcesOfIncomeValues}
                setSourcesOfIncomeValues={setSourcesOfIncomeValues}
                editDataOption
                companyAgreement={companyAgreement}
                initialGeneralInfData={initialValues.generalInformation.values}
              />
            )}
            {showRegularPaymentCyclesForm && (
              <RegularPaymentCyclesForm
                regularPaymentCycles={regularPaymentCycles}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onToggleEditedModal}
                onPreviousStep={onReset}
                setRegularPaymentCycles={setRegularPaymentCycles}
                editDataOption
                initialData={initialValues.ordinaryCycles.values}
                setIncludeExtraPayDay={setIncludeExtraPayDay}
                setRegularDeleted={setRegularDeleted}
              />
            )}
            {showExtraPaymentCyclesForm && (
              <ExtraordinaryPaymentCyclesForm
                extraordinaryPayment={extraordinaryPayment}
                setExtraordinaryPayment={setExtraordinaryPayment}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onToggleEditedModal}
                onPreviousStep={onReset}
                typeRegularPayroll={typeRegularPayroll}
                regularPaymentCycles={regularPaymentCycles}
                initialData={initialValues.extraordinaryCycles.values}
                editDataOption
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
          withIcon={modalData.withIcon}
          withCancelButton={modalData.withCancelButton}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
          icon={modalData.icon}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          moreDetails={modalData.moreDetails}
        />
      )}
      {showRequestProcessModal && (
        <RequestProcess
          portalId={portalId}
          saveData={savePayrollAgreement}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {showRequestStatus && (
        <RequestStatusModal
          portalId={portalId}
          title={titleRequest}
          description={descriptionRequest}
          requestNumber={savePayrollAgreement.requestNumber}
          onClick={onClosePendingRequestModal}
          onCloseModal={onClosePendingRequestModal}
          loading={false}
          actionText={actionTextRequest}
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { EditPayrollAgreementUI };
