import { forwardRef } from "react";
import { FormikProps } from "formik";
import { DateGeneralPoliciesUI } from "./interface";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { useDateVerification } from "@hooks/GeneralCreditPolicies/useDateVerification";
import { IDateVerificationForm } from "@ptypes/generalCredPolicies/forms/IDateVerificationForm";

const DateGeneralPolicies = forwardRef<
  FormikProps<IDateVerification>,
  IDateVerificationForm
>(
  (
    {
      initialValues,
      onFormValid,
      onSubmit,
      loading = false,
      onCloseModal,
      onFinishForm,
      setDateVerification,
    },
    ref,
  ) => {
    const { formik, isDisabledButton } = useDateVerification({
      initialValues,
      ref,
      onSubmit,
      onFormValid,
      setDateVerification,
    });

    return (
      <DateGeneralPoliciesUI
        formik={formik}
        onCloseModal={onCloseModal}
        onFinishForm={onFinishForm}
        loading={loading}
        isDisabledButton={isDisabledButton}
      />
    );
  },
);

DateGeneralPolicies.displayName = "DateGeneralPolicies";

export { DateGeneralPolicies };
