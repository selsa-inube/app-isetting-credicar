import { MdOutlineWarningAmber } from "react-icons/md";
import { Breadcrumbs, Stack, Tabs } from "@inubekit/inubekit";

import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { requestProcessMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestProcessMessage";
import { crumbsEditPayrollAgreement } from "@config/payrollAgreement/payrollAgreementTab/edit/navigation";
import { goBackModal } from "@config/goBackModal";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { DecisionModal } from "@design/modals/decisionModal";
import { ComponentAppearance } from "@enum/appearances";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { sendEditedModal } from "@config/payrollAgreement/payrollAgreementTab/generic/sendEditModal";
import { IEditPayrollAgreementUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IEditPayrollAgreementUI";
import { GeneralInformationPayrollForm } from "@pages/payrollAgreement/tabs/forms/generalInfoPayrollAgreement";
import { RegularPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/regularPaymentCycles";
import { ExtraordinaryPaymentCyclesForm } from "@pages/payrollAgreement/tabs/forms/extraordinaryPaymentCycles";
import { editPayrollLabels } from "@config/payrollAgreement/payrollAgreementTab/edit/editPayrollLabels";

const EditPayrollAgreementUI = (props: IEditPayrollAgreementUI) => {
  const {
    formReferences,
    formValues,
    isSelected,
    initialValues,
    smallScreen,
    sourcesOfIncomeValues,
    companyAgreement,
    showGoBackModal,
    showRequestProcessModal,
    savePayrollAgreement,
    showRequestStatus,
    requestSteps,
    showEditedModal,
    loadingSendData,
    regularPaymentCycles,
    typeRegularPayroll,
    extraordinaryPayment,
    showDeletedAlertModal,
    showGeneralInfPayrollForm,
    showRegularPaymentCyclesForm,
    showExtraPaymentCyclesForm,
    filteredTabs,
    title,
    description,
    actionText,
    moreDetails,
    titleRequest,
    descriptionRequest,
    actionTextRequest,
    setIncludeExtraPayDay,
    setRegularDeleted,
    regularDeleted,
    setExtraordinaryPayment,
    setRegularPaymentCycles,
    onTabChange,
    handleOpenModal,
    onReset,
    setIsCurrentFormValid,
    setSourcesOfIncomeValues,
    onCloseGoBackModal,
    onGoBack,
    onCloseRequestStatus,
    onClosePendingReqModal,
    onToggleEditedModal,
    onEditedModal,
    onToggleDeletedAlertModal,
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
                regularDeleted={regularDeleted}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      {showEditedModal && (
        <DecisionModal
          portalId="portal"
          title={sendEditedModal.title}
          description={sendEditedModal.description}
          actionText={sendEditedModal.actionText}
          onCloseModal={onToggleEditedModal}
          onClick={onEditedModal}
          loading={loadingSendData}
        />
      )}

      {showGoBackModal && (
        <DecisionModal
          portalId="portal"
          title={goBackModal.title}
          description={goBackModal.description}
          actionText={goBackModal.actionText}
          onCloseModal={onCloseGoBackModal}
          onClick={onGoBack}
        />
      )}
      {showDeletedAlertModal && (
        <DecisionModal
          portalId="portal"
          title={title}
          description={description}
          actionText={actionText}
          withIcon
          withCancelButton={false}
          icon={<MdOutlineWarningAmber />}
          appearance={ComponentAppearance.WARNING}
          onCloseModal={onToggleDeletedAlertModal}
          onClick={onToggleDeletedAlertModal}
          moreDetails={moreDetails}
        />
      )}
      {showRequestProcessModal && (
        <RequestProcess
          portalId="portal"
          saveData={savePayrollAgreement}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={ComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
        />
      )}
      {showRequestStatus && (
        <RequestStatusModal
          portalId="portal"
          title={titleRequest}
          description={descriptionRequest}
          requestNumber={savePayrollAgreement.requestNumber}
          onClick={onClosePendingReqModal}
          onCloseModal={onClosePendingReqModal}
          loading={false}
          actionText={actionTextRequest}
          appearance={ComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { EditPayrollAgreementUI };
