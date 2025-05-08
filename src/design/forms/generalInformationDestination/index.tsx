import { forwardRef, useContext } from "react";
import { FormikProps } from "formik";

import { useEnumerators } from "@hooks/useEnumerators";
import { useGeneralInformationForm } from "@hooks/moneyDestination/useGeneralInformationForm";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { IGeneralInformationForm } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationForm";
import { GeneralInformationFormUI } from "./interface";

const GeneralInformationForm = forwardRef<
  FormikProps<IGeneralInformationEntry>,
  IGeneralInformationForm
>(
  (
    {
      initialValues,
      initialGeneralInfData,
      onFormValid,
      onSubmit,
      onButtonClick,
      loading = false,
      editDataOption = false,
    },
    ref,
  ) => {
    const { appData } = useContext(AuthAndPortalData);

    const { enumData } = useEnumerators(
      "moneydestination",
      appData.businessUnit.publicCode,
    );

    const {
      autosuggestValue,
      optionsDestination,
      formik,
      buttonDisabledState,
      icon,
      labelButtonNext,
      handleChange,
      handleReset,
      valuesEqualBoton,
    } = useGeneralInformationForm(
      enumData,
      initialValues,
      ref,
      editDataOption,
      loading,
      onSubmit,
      onFormValid,
      initialGeneralInfData,
    );

    return (
      <GeneralInformationFormUI
        loading={loading}
        formik={formik}
        onButtonClick={onButtonClick}
        optionsDestination={optionsDestination}
        onChange={handleChange}
        autosuggestValue={autosuggestValue}
        editDataOption={editDataOption}
        buttonDisabledState={buttonDisabledState}
        icon={icon}
        valuesEqual={valuesEqualBoton}
        onReset={handleReset}
        labelButtonNext={labelButtonNext}
      />
    );
  },
);

GeneralInformationForm.displayName = "GeneralInformationForm";

export { GeneralInformationForm };
