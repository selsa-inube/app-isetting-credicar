import { forwardRef } from "react";
import { FormikProps } from "formik";
import { useInformationForm } from "@hooks/creditLine/useInformationForm";
import { IAddCreditLineForm } from "@ptypes/creditLines/forms/IAddCreditLineForm";
import { IInformationEntry } from "@ptypes/creditLines/forms/IInformationEntry";
import { AddCreditLineFormUI } from "./interface";

const AddCreditLineForm = forwardRef<
  FormikProps<IInformationEntry>,
  IAddCreditLineForm
>(
  (
    {
      onAddModal,
      onCloseModal,
      initialValues,
      isCurrentFormValid,
      onFormValid,
      onSubmit,
      loading = false,
    },
    ref,
  ) => {
    const { formik } = useInformationForm({
      initialValues,
      ref,
      onSubmit,
      onFormValid,
    });

    return (
      <AddCreditLineFormUI
        formik={formik}
        loading={loading}
        disabledButton={!isCurrentFormValid}
        onAddModal={onAddModal}
        onCloseModal={onCloseModal}
      />
    );
  },
);

AddCreditLineForm.displayName = "AddCreditLineForm";

export { AddCreditLineForm };
