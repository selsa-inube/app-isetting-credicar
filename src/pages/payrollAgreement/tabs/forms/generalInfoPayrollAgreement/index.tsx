import { forwardRef } from "react";
import { FormikProps } from "formik";

import { IGeneralInformationEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayroll";
import { useGeneralInformationForm } from "@hooks/payrollAgreement/useGeneralInformationForm";
import { IServerDomain } from "@ptypes/IServerDomain";
import { infoModal } from "@config/payrollAgreement/payrollAgreementTab/generic/infoModal";
import { IGeneralInformationPayrollForm } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayrollForm";
import { GeneralInformationPayrollFormUI } from "./interface";

const GeneralInformationPayrollForm = forwardRef<
  FormikProps<IGeneralInformationEntry>,
  IGeneralInformationPayrollForm
>(
  (
    {
      initialValues,
      sourcesOfIncomeValues,
      companyAgreement,
      onFormValid,
      onSubmit,
      onButtonClick,
      onPreviousStep,
      setSourcesOfIncomeValues,
      onReset,
      loading = false,
      editDataOption = false,
      initialGeneralInfData,
    },
    ref,
  ) => {
    const {
      autosuggestValue,
      formik,
      showModal,
      valuesEqual,
      isMobile,
      typePayrollOptions,
      isDisabledButton,
      gridTemplateRows,
      labelButtonPrevious,
      labelButtonNext,
      showCodeModal,
      titleCodeModal,
      descriptionCodeModal,
      actionTextCodeModal,
      moreDetailsCode,
      handleToggleCodeModal,
      handleChangeSelect,
      handleChangeAutosuggest,
      handleReset,
      handleToggleModal,
      handleChangeCheck,
    } = useGeneralInformationForm({
      initialValues,
      ref,
      editDataOption,
      loading,
      sourcesOfIncomeValues,
      onSubmit,
      onFormValid,
      setSourcesOfIncomeValues,
      initialGeneralInfData,
    });

    return (
      <GeneralInformationPayrollFormUI
        loading={loading}
        formik={formik}
        onButtonClick={onButtonClick}
        onChangeSelect={handleChangeSelect}
        onChangeAutosuggest={handleChangeAutosuggest}
        autosuggestValue={autosuggestValue}
        onPreviousStep={onPreviousStep}
        editDataOption={editDataOption}
        isDisabledButton={isDisabledButton}
        showModal={showModal}
        valuesEqual={valuesEqual}
        onResetAdd={handleReset}
        onResetEdit={onReset}
        infoModal={infoModal}
        onToggleInfoModalModal={handleToggleModal}
        onChangeCheck={handleChangeCheck}
        sourcesOfIncomeValues={sourcesOfIncomeValues}
        isMobile={isMobile}
        typePayrollOptions={typePayrollOptions as IServerDomain[]}
        companyAgreement={companyAgreement}
        gridTemplateRows={gridTemplateRows}
        labelButtonPrevious={labelButtonPrevious}
        labelButtonNext={labelButtonNext}
        showCodeModal={showCodeModal}
        titleCodeModal={titleCodeModal}
        descriptionCodeModal={descriptionCodeModal}
        actionTextCodeModal={actionTextCodeModal}
        onToggleCodeModal={handleToggleCodeModal}
        moreDetailsCode={moreDetailsCode}
      />
    );
  },
);

GeneralInformationPayrollForm.displayName = "GeneralInformationPayrollForm";

export { GeneralInformationPayrollForm };
