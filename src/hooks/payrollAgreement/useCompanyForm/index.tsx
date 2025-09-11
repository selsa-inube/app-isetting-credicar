import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCountries } from "@hooks/generic/useCountries";
import { useEnumeratorsIsaas } from "@hooks/useEnumeratorsIsaas";
import { useCitySubdivisionCountry } from "@hooks/generic/useCitySubdivisionCountry";
import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { optionsFromEnumI18n } from "@utils/optionsFromEnumI18n";
import { enviroment, mediaQueryTablet } from "@config/environment";
import { alertModal } from "@config/payrollAgreement/payrollAgreementTab/generic/alertModal";
import { IUseCompanyForm } from "@ptypes/hooks/IUseCompanyForm";
import { ILanguage } from "@ptypes/i18n";
import { useLegalPerson } from "../useLegalPerson";

const useCompanyForm = (props: IUseCompanyForm) => {
  const { initialValues, ref, onSubmit, onFormValid } = props;
  const validationSchema = object().shape({
    companySelected: validationRules.string.required(
      validationMessages.required,
    ),
    companyName: validationRules.string,
    companyTypeIdent: validationRules.string,
    companyNumberIdent: validationRules.string,
    companyNameCommercial: validationRules.string,
    companyComplement: validationRules.string,
    companyCity: validationRules.string,
    companyAddressRes: validationRules.string,
    companyCountry: validationRules.string,
    companyCountryIdent: validationRules.string,
  });

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: true,
    onSubmit: onSubmit ?? (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const { appData } = useContext(AuthAndPortalData);
  const { legalPersonOptions, legalPersonData } = useLegalPerson({
    businessUnits: appData.businessUnit.publicCode,
  });
  const { optionsCountries } = useCountries();
  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery(mediaQueryTablet);

  const { optionsCitySubdivision: optionsCities } = useCitySubdivisionCountry({
    countryName: EPayrollAgreement.COUNTRY,
  });

  const { enumData: typeIdentification } = useEnumeratorsIsaas({
    enumIsaas: ECyclesPayroll.TYPE_IDENTIFICATION_COMPANY,
  });

  const optionsIdentification = optionsFromEnumI18n(
    enviroment.VITE_LANGUAGE as ILanguage,
    typeIdentification,
    false,
  );

  const legalPersonExists = (companyNumberIdent: string) => {
    return legalPersonData.find(
      (item) =>
        item.identificationDocumentNumber === String(companyNumberIdent),
    );
  };

  useEffect(() => {
    legalPersonExists(formik.values.companyNumberIdent ?? "");
    const inter = setTimeout(() => {
      const personExists = legalPersonExists(
        formik.values.companyNumberIdent ?? "",
      );

      if (personExists) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }, 500);

    return () => {
      if (inter) {
        clearTimeout(inter);
      }
    };
  }, [formik.values.companyNumberIdent]);

  const { title, description, actionText, moreDetails } = alertModal(
    legalPersonExists(formik.values.companyNumberIdent ?? "")
      ?.payingEntityName ?? "",
  );

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        const isFormValid = Object.keys(errors).length === 0;
        onFormValid(isFormValid);
      });
    }
  }, [formik.values, onFormValid]);

  const handleCompanyChange = (name: string, value: string) => {
    formik.setFieldValue(name, value).then(() => {
      formik.validateForm().then((errors) => {
        formik.setErrors(errors);
      });
    });

    if (
      name === EPayrollAgreement.COMPANY_SELECTED &&
      value === EPayrollAgreement.ADD_COMPANY
    ) {
      setDynamicValidationSchema(
        validationSchema.shape({
          companyName: validationRules.string.required(
            validationMessages.required,
          ),
          companyTypeIdent: validationRules.string.required(
            validationMessages.required,
          ),
          companyNumberIdent: validationRules.string
            .required(validationMessages.required)
            .test(
              "valid-identification",
              validationMessages.identification,
              (value) =>
                legalPersonExists(value)?.identificationDocumentNumber !==
                String(value),
            ),
          companyNameCommercial: validationRules.string.required(
            validationMessages.required,
          ),
          companyComplement: validationRules.string.required(
            validationMessages.required,
          ),
          companyCity: validationRules.string.required(
            validationMessages.required,
          ),
          companyAddressRes: validationRules.string.required(
            validationMessages.required,
          ),
          companyCountry: validationRules.string.required(
            validationMessages.required,
          ),
          companyCountryIdent: validationRules.string.required(
            validationMessages.required,
          ),
        }),
      );
    } else {
      setDynamicValidationSchema(
        validationSchema.shape({
          companySelected: validationRules.string.required(
            validationMessages.required,
          ),
        }),
      );
    }
  };

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value).then(() => {
      formik.validateForm().then((errors) => {
        formik.setErrors(errors);
      });
    });
  };

  const handleToggleAlertModal = () => {
    setShowModal(!showModal);
  };

  const isAddingCompany =
    formik.values.companySelected === EPayrollAgreement.ADD_COMPANY;

  return {
    formik,
    legalPersonOptions,
    optionsCountries,
    optionsCities,
    isMobile,
    title,
    description,
    actionText,
    moreDetails,
    showModal,
    isAddingCompany,
    optionsIdentification,
    handleChange,
    handleCompanyChange,
    handleToggleAlertModal,
  };
};

export { useCompanyForm };
