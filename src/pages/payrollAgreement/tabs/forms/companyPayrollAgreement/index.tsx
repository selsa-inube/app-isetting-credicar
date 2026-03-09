import { IOption } from "@inubekit/inubekit";
import { forwardRef } from "react";
import { FormikProps } from "formik";
import { ICompanyEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyEntry";
import { useCompanyForm } from "@hooks/payrollAgreement/useCompanyForm";
import { ICompanyForm } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyForm";
import { CompanyFormUI } from "./interface";

const CompanyForm = forwardRef<FormikProps<ICompanyEntry>, ICompanyForm>(
  (
    {
      initialValues,
      initialCompanyData,
      onFormValid,
      onSubmit,
      onReset = () => void 0,
      option = false,
      editDataOption = false,
      onButtonClick,
      loading = false,
    },
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
      optionsIdentification,
      buttonLabel,
      isDisabledButton,
      handleToggleAlertModal,
      handleChange,
      handleCompanyChange,
    } = useCompanyForm({
      initialValues,
      editDataOption,
      ref,
      onSubmit,
      onFormValid,
      option,
      initialCompanyData,
    });

    return (
      <CompanyFormUI
        loading={loading}
        formik={formik}
        onButtonClick={onButtonClick}
        onChange={handleChange}
        isDisabledButton={isDisabledButton}
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
        optionsIdentification={optionsIdentification as IOption[]}
        editDataOption={editDataOption}
        buttonLabel={buttonLabel}
        onReset={onReset}
      />
    );
  },
);

CompanyForm.displayName = "CompanyForm";

export { CompanyForm };
