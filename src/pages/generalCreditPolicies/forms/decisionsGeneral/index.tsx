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
      initialValuesEdit,
      setShowReciprocity,
      setShowFactor,
    },
    ref,
  ) => {
    const {
      formik,
      showModal,
      isMobile,
      isDisabledButton,
      buttonLabel,
      handleChange,
      handleInfoModal,
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
    });

    return (
      <DecisionsGeneralFormUI
        editDataOption={editDataOption}
        loading={loading}
        formik={formik}
        onButtonClick={handleNextStep}
        onReferenceChange={handleChange}
        onToggle={handleToggleChange}
        showModal={showModal}
        onInfoModal={handleInfoModal}
        isMobile={isMobile}
        isDisabledButton={isDisabledButton}
        buttonLabel={buttonLabel}
        onResetEdit={onReset}
      />
    );
  },
);

DecisionsGeneralForm.displayName = "DecisionsGeneralForm";

export { DecisionsGeneralForm };
