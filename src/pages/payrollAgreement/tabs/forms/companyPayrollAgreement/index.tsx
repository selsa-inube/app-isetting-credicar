import { forwardRef } from "react";
import { FormikProps } from "formik";
import { ICompanyEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyEntry";
import { useCompanyForm } from "@hooks/payrollAgreement/useCompanyForm";
import { ICompanyForm } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyForm";
import { CompanyFormUI } from "./interface";

const CompanyForm = forwardRef<FormikProps<ICompanyEntry>, ICompanyForm>(
  (
    { initialValues, onFormValid, onSubmit, onButtonClick, loading = false },
    ref,
  ) => {
    const {
      formik,
      optionsCountries,
      optionsCities,
      legalPersonOptions,
      isMobile,
      showModal,
      title,
      description,
      actionText,
      moreDetails,
      isAddingCompany,
      handleToggleAlertModal,
      handleChange,
      handleCompanyChange,
    } = useCompanyForm({ initialValues, ref, onSubmit, onFormValid });

    return (
      <CompanyFormUI
        loading={loading}
        formik={formik}
        onButtonClick={onButtonClick}
        onChange={handleChange}
        isDisabledButton={!formik.isValid}
        onCompanyChange={handleCompanyChange}
        optionsCountries={optionsCountries}
        optionsCities={optionsCities}
        legalPerson={legalPersonOptions}
        isMobile={isMobile}
        showModal={showModal}
        onToggleAlertModal={handleToggleAlertModal}
        titleAlertModal={title}
        descriptionModal={description}
        actionTextModal={actionText}
        moreDetailsModal={moreDetails}
        isAddingCompany={isAddingCompany}
      />
    );
  },
);

CompanyForm.displayName = "CompanyForm";

export { CompanyForm };
