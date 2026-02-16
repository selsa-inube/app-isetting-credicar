import { forwardRef } from "react";
import { FormikProps } from "formik";

import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { useDecisionsGenForm } from "@hooks/GeneralCreditPolicies/useDecisionsGenForm";
import { IDecisionsGeneralForm } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralForm";
import { DecisionsGeneralFormUI } from "./interface";

const DecisionsGeneralForm = forwardRef<
  FormikProps<IDecisionsGeneralEntry>,
  IDecisionsGeneralForm
>(
  (
    {
      initialValues,
      onFormValid,
      onSubmit,
      handleNextStep,
      loading = false,
      editDataOption = false,
      handleFormValidChange,
      onReset,
      setOptionsGenDecision,
      initialValuesEdit,
      setShowReciprocity,
      setShowFactor,
    },
    ref,
  ) => {
    const {
      formik,
      showInformationReferenceModal,
      showInformationMethodModal,
      showInformationObligationModal,
      isMobile,
      isDisabledButton,
      buttonLabel,
      methodsOptions,
      payrollAdvanceOptions,
      payrollSpecialAdvanceOptions,
      creditBureausOptions,
      isLoadingEnums,
      handleChange,
      handleChangeCreditBureaus,
      handleInformationReferenceModal,
      handleInformationObligationModal,
      handleInformationMethodsModal,
      handleToggleChange,
    } = useDecisionsGenForm({
      initialValues,
      ref,
      editDataOption,
      onSubmit,
      onFormValid,
      handleFormValidChange,
      initialValuesEdit,
      setShowReciprocity,
      setShowFactor,
      setOptionsGenDecision,
    });

    return (
      <DecisionsGeneralFormUI
        editDataOption={editDataOption}
        loading={loading}
        formik={formik}
        onButtonClick={handleNextStep}
        onToggle={handleToggleChange}
        showInformationReferenceModal={showInformationReferenceModal}
        showInformationMethodModal={showInformationMethodModal}
        showInformationObligationModal={showInformationObligationModal}
        onInfoRefModal={handleInformationReferenceModal}
        onInfoObligModal={handleInformationObligationModal}
        onInfoMethodsModal={handleInformationMethodsModal}
        isMobile={isMobile}
        isDisabledButton={isDisabledButton}
        buttonLabel={buttonLabel}
        onResetEdit={onReset}
        methodsOptions={methodsOptions}
        payrollAdvanceOptions={payrollAdvanceOptions}
        payrollSpecialAdvanceOptions={payrollSpecialAdvanceOptions}
        onChange={handleChange}
        isLoadingEnums={isLoadingEnums}
        creditBureausOptions={creditBureausOptions}
        onChangeCreditBureaus={handleChangeCreditBureaus}
      />
    );
  },
);

DecisionsGeneralForm.displayName = "DecisionsGeneralForm";

export { DecisionsGeneralForm };
