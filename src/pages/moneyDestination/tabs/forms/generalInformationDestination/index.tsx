import { forwardRef, useContext } from "react";
import { FormikProps } from "formik";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useGeneralInformationForm } from "@hooks/moneyDestination/useGeneralInformationForm";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { IGeneralInformationForm } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationForm";
import { IServerDomain } from "@ptypes/IServerDomain";
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
      onReset,
      onButtonClick,
      loading = false,
      editDataOption = false,
    },
    ref,
  ) => {
    const { appData } = useContext(AuthAndPortalData);

    const { enumDestination } = useEnumsMoneyDestination({
      businessUnits: appData.businessUnit.publicCode,
    });

    const {
      autosuggestValue,
      optionsDestination,
      formik,
      buttonDisabledState,
      labelButtonNext,
      isMobile,
      widthStack,
      directionStack,
      alignItemsIcon,
      paddingIcon,
      handleChange,
    } = useGeneralInformationForm(
      enumDestination,
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
        optionsDestination={optionsDestination as IServerDomain[]}
        onChange={handleChange}
        autosuggestValue={autosuggestValue}
        editDataOption={editDataOption}
        buttonDisabledState={buttonDisabledState}
        onReset={onReset}
        labelButtonNext={labelButtonNext}
        isMobile={isMobile}
        widthStack={widthStack}
        directionStack={directionStack}
        alignItemsIcon={alignItemsIcon}
        paddingIcon={paddingIcon}
      />
    );
  },
);

GeneralInformationForm.displayName = "GeneralInformationForm";

export { GeneralInformationForm };
