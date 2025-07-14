import { forwardRef } from "react";
import { FormikProps } from "formik";

import { useCreditProspectForm } from "@hooks/creditLine/useCreditProspectForm";
import { ICreditProspectEntry, IOptionsProspect } from "./types";
import { CreditProspectFormUI } from "./interface";

interface ICreditProspectForm {
  initialValues: ICreditProspectEntry;
  loading?: boolean;
  optionsProspect: IOptionsProspect[];
  isFormValid: boolean;
  handleNextStep: () => void;
  onPreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICreditProspectEntry) => void;
  setOptionsProspect: React.Dispatch<React.SetStateAction<IOptionsProspect[]>>;
}

const CreditProspectForm = forwardRef<
  FormikProps<ICreditProspectEntry>,
  ICreditProspectForm
>(
  (
    {
      initialValues,
      optionsProspect,
      isFormValid,
      setOptionsProspect,
      onFormValid,
      onSubmit,
      handleNextStep,
      onPreviousStep,
      loading,
    },
    ref,
  ) => {
    const {
      formik,
      additionalDebtorsField,
      isMobile,
      handleChange,
      handleToggleEntry,
    } = useCreditProspectForm(
      optionsProspect,
      initialValues,
      ref,
      onSubmit,
      onFormValid,
      setOptionsProspect,
    );

    return (
      <CreditProspectFormUI
        loading={loading}
        formik={formik}
        entries={optionsProspect}
        onNextStep={handleNextStep}
        onPreviousStep={onPreviousStep}
        onChange={handleChange}
        onToggle={handleToggleEntry}
        additionalDebtorsField={additionalDebtorsField}
        isFormValid={isFormValid}
        isMobile={isMobile}
      />
    );
  },
);

CreditProspectForm.displayName = "CreditProspectForm";

export { CreditProspectForm };
export type { ICreditProspectForm };
