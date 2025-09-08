import { forwardRef } from "react";
import { FormikProps } from "formik";

import { useNameAndDescriptionForm } from "@hooks/creditLine/useNameAndDescriptionForm";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";
import { INameAndDescriptionForm } from "@ptypes/creditLines/forms/IGeneralInformationPayrollForm";
import { NameAndDescriptionFormUI } from "./interface";

const NameAndDescriptionForm = forwardRef<
  FormikProps<INameAndDescriptionEntry>,
  INameAndDescriptionForm
>(({ initialValues, onFormValid, onSubmit, loading = false }, ref) => {
  const { formik } = useNameAndDescriptionForm({
    initialValues,
    ref,
    loading,
    onSubmit,
    onFormValid,
  });

  return <NameAndDescriptionFormUI formik={formik} />;
});

NameAndDescriptionForm.displayName = "NameAndDescriptionForm";

export { NameAndDescriptionForm };
