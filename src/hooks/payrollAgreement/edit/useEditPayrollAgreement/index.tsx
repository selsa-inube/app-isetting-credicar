import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { FormikProps } from "formik";

import { compareObjects } from "@utils/compareObjects";
import { formatDate } from "@utils/date/formatDate";
import { optionsFromEnumerators } from "@utils/optionsFromEnumerators";
import { addLeadingZero } from "@utils/addLeadingZero";
import { IRegularPaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/IRegularPaymentCycles";
import { severancePay } from "@config/payrollAgreement/payrollAgreementTab/assisted/severancePaymentCycles";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsIncome } from "@hooks/useEnumeratorsIncome";
import { useLegalPerson } from "@hooks/payrollAgreement/useLegalPerson";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { ERequestType } from "@enum/requestType";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { EGeneral } from "@enum/general";
import { dataTranslations } from "@utils/dataTranslations";
import { getDayPayment } from "@utils/getDayPayment";
import { transformToArray } from "@utils/transformToArray";
import { includedPeriodicity } from "@config/payrollAgreement/payrollAgreementTab/assisted/excludedPeriodicity";
import { formatPaymentDayExtra } from "@utils/formatPaymentDayExtra";
import { getCompanyComp } from "@utils/getCompanyComp";
import { getSourcesIncome } from "@utils/getSourcesIncome";
import { jsonLabels } from "@config/payrollAgreement/payrollAgreementTab/edit/jsonlLabels";
import { mediaQueryMobile } from "@config/environment";
import { payrollType } from "@config/payrollAgreement/payrollAgreementTab/edit/typePayroll";
import { editPayrollAgTabsConfig } from "@config/payrollAgreement/payrollAgreementTab/edit/tab";
import { typePayrollForCyclesExtraord } from "@config/payrollAgreement/payrollAgreementTab/assisted/typePayrollForCyclesExtraord";
import { specialBenefitPayment } from "@config/payrollAgreement/payrollAgreementTab/assisted/specialBenefitPaymentCycles";
import { IUseEditPayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseEditPayrollAgreement";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { IIncomeTypes } from "@ptypes/payrollAgreement/RequestPayrollAgre/IIncomeTypes";
import { IEditPayrollTabsConfig } from "@ptypes/payrollAgreement/payrollAgreementTab/IEditPayrollTabsConfig";
import { IPayrollSpecialBenefit } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollSpecialBenefit";
import { ISeverancePaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/ISeverancePaymentCycles";
import { IGeneralInformationEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayroll";
import { IEditPayrollAgreementForms } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IEditPayrollAgreementForms";
import { IServerDomain } from "@ptypes/IServerDomain";
import { ICompanyEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";
import { useManagePayrollCycles } from "../useManagePayrollCycles";

const useEditPayrollAgreement = (props: IUseEditPayrollAgreement) => {
  const { data, loading, option } = props;
  const { appData } = useContext(AuthAndPortalData);

  const regularPaymentValues = useMemo(() => {
    const cycles = transformToArray<IRegularPaymentCycles>(
      data?.regularPaymentCycles,
    );
    return cycles
      ? cycles.map((entry, index) => ({
          id: String(index + 1),
          cycleId: `${addLeadingZero(index + 1).toString()}`,
          payrollForDeductionAgreementId: entry.payrollForDeductionAgreementId,
          regularPaymentCycleNumber: entry.regularPaymentCycleNumber,
          nameCycle: entry.regularPaymentCycleName,
          periodicity: dataTranslations[entry.schedule] ?? entry.schedule,
          payday: getDayPayment(entry.paymentDay),
          numberDaysUntilCut: String(entry.numberOfDaysBeforePaymentToBill),
          laborRegulatorFramework: entry.regulatoryFrameworkCode ?? "",
        }))
      : [];
  }, [data, loading, appData.language]);

  const extraordinaryPaymentValues = useMemo(() => {
    const specials = data?.payrollSpecialBenefitPaymentCycles
      ? transformToArray<IPayrollSpecialBenefit>(
          data.payrollSpecialBenefitPaymentCycles,
        ).map((entry, index) => ({
          id: `cycle-special-benefit-${addLeadingZero(index + 1).toString()}`,
          payrollForDeductionAgreementId: entry.payrollForDeductionAgreementId,
          nameCycle: entry.abbreviatedName,
          typePayment: specialBenefitPayment[0],
          payday: formatPaymentDayExtra(entry.paymentDay) ?? entry.paymentDay,
          paydayTranslation: formatPaymentDayExtra(entry.paymentDay),
          numberDaysUntilCut: String(entry.numberOfDaysBeforePaymentToBill),
          laborRegulatorFramework: entry.regulatoryFrameworkCode ?? "",
        }))
      : [];

    const severances = data?.severancePaymentCycles
      ? transformToArray<ISeverancePaymentCycles>(
          data.severancePaymentCycles,
        ).map((entry, index) => ({
          id: `cycle-severance-${addLeadingZero(index + 1).toString()}`,
          payrollForDeductionAgreementId: entry.payrollForDeductionAgreementId,
          nameCycle: entry.abbreviatedName,
          typePayment: severancePay[0],
          payday: formatPaymentDayExtra(entry.paymentDay),
          paydayTranslation: formatPaymentDayExtra(entry.paymentDay),
          numberDaysUntilCut: String(entry.numberOfDaysBeforePaymentToBill),
          laborRegulatorFramework: entry.regulatoryFrameworkCode ?? "",
        }))
      : [];

    return [...specials, ...severances];
  }, [data, loading, appData.language]);

  const { addressRes, complement } = getCompanyComp(
    data?.company?.headquarterAddress ?? "",
  );

  const initialData = {
    generalInformation: {
      isValid: false,
      values: {
        code: data?.payrollForDeductionAgreementCode ?? "",
        abbreviatedName: data?.abbreviatedName ?? "",
        typePayroll:
          dataTranslations[data?.payrollForDeductionAgreementType] ??
          data?.payrollForDeductionAgreementType ??
          "",
        sourcesOfIncome: getSourcesIncome(data?.incomeTypes ?? []),
        applicationDaysPayroll: String(
          data?.numberOfDaysForReceivingTheDiscounts ?? 0,
        ),
      },
    },
    ordinaryCycles: {
      isValid: false,
      values: regularPaymentValues,
    },
    extraordinaryCycles: {
      isValid: false,
      values: extraordinaryPaymentValues,
    },
    ...(option && {
      company: {
        isValid: false,
        values: {
          companySelected: data?.payingEntityName ?? "",
          companyName: data?.company?.payingEntityName ?? "",
          companyTypeIdent: data?.company?.identificationTypeLegalPerson ?? "",
          companyNumberIdent: data?.company?.identificationDocumentNumber ?? "",
          companyNameCommercial: data?.company?.tradename ?? "",
          companyComplement: complement ?? "",
          companyCity: data?.company?.headquarterCity ?? "",
          companyAddressRes: addressRes ?? "",
          companyCountry: data?.company?.countryTaxResidence ?? "",
          companyCountryIdent: data?.company?.countryOfIdentityDocument ?? "",
        },
      },
    }),
  };
  const companyAgreement = data?.payingEntityName ?? "";

  const [formValues, setFormValues] =
    useState<IEditPayrollAgreementForms>(initialData);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showDeletedAlertModal, setShowDeletedAlertModal] = useState(false);
  const [typeRegularPayroll, setTypeRegularPayroll] = useState<boolean>(false);
  const [regularPaymentCycles, setRegularPaymentCycles] = useState<
    IOrdinaryCyclesEntry[]
  >(initialData.ordinaryCycles.values);
  const [extraordinaryPayment, setExtraordinaryPayment] = useState<
    IExtraordinaryCyclesEntry[]
  >(extraordinaryPaymentValues);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [canRefresh, setCanRefresh] = useState(false);
  const [sourcesOfIncomeValues, setSourcesOfIncomeValues] = useState<
    IServerDomain[]
  >([]);
  const [regularDeleted, setRegularDeleted] = useState<IOrdinaryCyclesEntry[]>(
    [],
  );
  const [includeExtraPayDay, setIncludeExtraPayDay] =
    useState<IOrdinaryCyclesEntry[]>();
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { legalPersonData } = useLegalPerson({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const [currentTypePayroll, setCurrentTypePayroll] = useState<string>(
    initialData.generalInformation.values.typePayroll,
  );

  useEffect(() => {
    if (!data) return;

    setFormValues({
      generalInformation: {
        isValid: false,
        values: {
          code: data.payrollForDeductionAgreementCode ?? "",
          abbreviatedName: data.abbreviatedName ?? "",
          typePayroll:
            dataTranslations[data.payrollForDeductionAgreementType] ??
            data.payrollForDeductionAgreementType ??
            "",
          sourcesOfIncome: getSourcesIncome(data.incomeTypes ?? []),
          applicationDaysPayroll: String(
            data.numberOfDaysForReceivingTheDiscounts ?? 0,
          ),
        },
      },
      ordinaryCycles: {
        isValid: false,
        values: regularPaymentValues,
      },
      extraordinaryCycles: {
        isValid: false,
        values: extraordinaryPaymentValues,
      },
      ...(option && {
        company: {
          isValid: false,
          values: {
            companySelected: data?.payingEntityName ?? "",
            companyName: data?.company?.payingEntityName ?? "",
            companyTypeIdent:
              data?.company?.identificationTypeLegalPerson ?? "",
            companyNumberIdent:
              data?.company?.identificationDocumentNumber ?? "",
            companyNameCommercial: data?.company?.tradename ?? "",
            companyComplement: complement ?? "",
            companyCity: data?.company?.headquarterCity ?? "",
            companyAddressRes: addressRes ?? "",
            companyCountry: data?.company?.countryTaxResidence ?? "",
            companyCountryIdent: data?.company?.countryOfIdentityDocument ?? "",
          },
        },
      }),
    });

    setRegularPaymentCycles(regularPaymentValues);
    setExtraordinaryPayment(extraordinaryPaymentValues);
    setCurrentTypePayroll(
      dataTranslations[data.payrollForDeductionAgreementType] ??
        data.payrollForDeductionAgreementType ??
        "",
    );
    setTypeRegularPayroll(
      typePayrollForCyclesExtraord.includes(
        dataTranslations[data.payrollForDeductionAgreementType] ??
          data.payrollForDeductionAgreementType ??
          "",
      ),
    );
  }, [data, option]);

  const initialValues = initialData.generalInformation.values;

  const navigate = useNavigate();
  const conditionRule = EPayrollAgreement.CONDITION_RULE;
  const smallScreen = useMediaQuery(mediaQueryMobile);

  const companyRef = useRef<FormikProps<ICompanyEntry>>(null);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const { enumData: incometype } = useEnumeratorsIncome({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const extraordinaryData = extraordinaryPaymentValues;

  const shouldHideExtraordinaryTab = useMemo(() => {
    const hasValidPeriodicity = regularPaymentCycles.some((cycle) => {
      const isValidPeriodicity =
        cycle.periodicity !== undefined &&
        includedPeriodicity.includes(cycle.periodicity);
      return isValidPeriodicity;
    });

    return !hasValidPeriodicity && extraordinaryData.length === 0;
  }, [extraordinaryData, regularPaymentCycles, includedPeriodicity]);

  const shouldHideOrdinaryTab = useMemo(() => {
    return typePayrollForCyclesExtraord.includes(currentTypePayroll);
  }, [currentTypePayroll]);

  const filteredTabsConfig = useMemo(() => {
    return Object.keys(editPayrollAgTabsConfig).reduce((acc, key) => {
      const tab =
        editPayrollAgTabsConfig[key as keyof typeof editPayrollAgTabsConfig];

      const ordinaryData = regularPaymentValues;
      if (!option && key === editPayrollAgTabsConfig.company.id) {
        return acc;
      }

      if (key === editPayrollAgTabsConfig.regularPaymentCycles.id) {
        if (!option) {
          if (ordinaryData.length === 0) return acc;
        } else {
          if (!shouldHideOrdinaryTab) return acc;
        }
      }

      if (
        key === editPayrollAgTabsConfig.extraordinaryPaymentCycles.id &&
        shouldHideExtraordinaryTab
      ) {
        return acc;
      }

      if (tab !== undefined) {
        acc[key as keyof IEditPayrollTabsConfig] = tab;
      }
      return acc;
    }, {} as IEditPayrollTabsConfig);
  }, [
    option,
    regularPaymentValues,
    extraordinaryPaymentValues,
    regularPaymentCycles,
    currentTypePayroll,
  ]);

  const getFirstFilteredTab = (filteredTabsConfig: IEditPayrollTabsConfig) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IEditPayrollTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredTabsConfig)?.id;
  const [isSelected, setIsSelected] = useState<string>(
    defaultSelectedTab ?? editPayrollAgTabsConfig.generalInformation.id,
  );

  const { newRegularPayment, newExtraordinaryPayment, newSourcesIncome } =
    useManagePayrollCycles({
      initialData,
      regularPaymentCycles,
      isSelected,
      extraordinaryPayment,
      setExtraordinaryPayment,
      sourcesOfIncome: formValues.generalInformation.values.sourcesOfIncome,
      initialSourcesOfIncome: initialValues.sourcesOfIncome,
      payrollId: data?.payrollForDeductionAgreementId,
      option,
    });

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialData, formValues) ||
        (generalInformationRef.current &&
          !compareObjects(
            generalInformationRef.current.initialValues,
            generalInformationRef.current.values,
          ));

      if (hasUnsavedChanges) {
        event.preventDefault();
        setShowGoBackModal(!showGoBackModal);

        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formValues, initialData, generalInformationRef, canRefresh]);

  useEffect(() => {
    const options = optionsFromEnumerators(incometype);
    const updatedData = options.map((entry) =>
      initialData.generalInformation.values.sourcesOfIncome?.includes(
        entry.label,
      )
        ? { ...entry, checked: true }
        : { ...entry, checked: false },
    );
    setSourcesOfIncomeValues(updatedData);
  }, [incometype]);

  useEffect(() => {
    if (generalInformationRef.current) {
      setFormValues((prev) => ({
        ...prev,
        generalInformation: {
          ...prev.generalInformation,
          values: {
            ...prev.generalInformation.values,
            ...generalInformationRef.current?.values,
          },
        },
      }));
    }
  }, [generalInformationRef.current?.values]);

  useEffect(() => {
    if (option && companyRef.current) {
      setFormValues((prev) => ({
        ...prev,
        company: {
          isValid: prev.company?.isValid ?? false,
          values: {
            ...prev.company?.values,
            ...companyRef.current?.values,
          },
        },
      }));
    }
  }, [companyRef.current?.values]);

  const handleTabChange = (tabId: string) => {
    const currentTabRegularEmpty =
      isSelected === editPayrollAgTabsConfig.regularPaymentCycles.id &&
      regularPaymentCycles.length === 0;

    const currentTabExtraOrdEmpty =
      isSelected === editPayrollAgTabsConfig.extraordinaryPaymentCycles.id &&
      !typeRegularPayroll &&
      extraordinaryPayment.length === 0;

    if (currentTabRegularEmpty || currentTabExtraOrdEmpty) {
      setShowDeletedAlertModal(true);
      return;
    }

    const latestTypePayroll = generalInformationRef.current?.values.typePayroll;
    const typePayrollChanged = latestTypePayroll !== initialValues.typePayroll;

    if (typePayrollChanged && latestTypePayroll) {
      setRegularPaymentCycles([]);
      setExtraordinaryPayment([]);
      setIncludeExtraPayDay([]);
      setRegularDeleted([]);

      setFormValues((prev) => ({
        ...prev,
        generalInformation: {
          ...prev.generalInformation,
          values: {
            ...prev.generalInformation.values,
            ...generalInformationRef.current?.values,
          },
        },
        ordinaryCycles: {
          isValid: false,
          values: [
            {
              cycleId: "",
              nameCycle: "",
              periodicity: "",
              payday: "",
              numberDaysUntilCut: "",
              laborRegulatorFramework: "",
            },
          ],
        },
        extraordinaryCycles: {
          isValid: false,
          values: [
            {
              nameCycle: "",
              typePayment: "",
              payday: "",
              numberDaysUntilCut: "",
              laborRegulatorFramework: "",
            },
          ],
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        generalInformation: {
          ...prev.generalInformation,
          values: {
            ...prev.generalInformation.values,
            ...generalInformationRef.current?.values,
          },
        },
        ...(option && {
          company: {
            ...prev.company,
            isValid: false,
            values: {
              ...prev.company?.values,
              ...companyRef?.current?.values,
            },
          },
        }),
      }));
    }

    if (
      isSelected === editPayrollAgTabsConfig.regularPaymentCycles.id &&
      includeExtraPayDay?.length === 0
    ) {
      setFormValues((prev) => ({
        ...prev,
        extraordinaryCycles: {
          isValid: false,
          values: [
            {
              nameCycle: "",
              typePayment: "",
              payday: "",
              numberDaysUntilCut: "",
              laborRegulatorFramework: "",
            },
          ],
        },
      }));
    }

    setIsSelected(tabId);
  };

  const handleToggleDeletedAlertModal = () => {
    setShowDeletedAlertModal(!showDeletedAlertModal);
  };

  const handleToggleEditedModal = () => {
    setShowModal(!showModal);
  };

  const handleReset = () => {
    setShowGoBackModal(true);
  };

  const handleEditedModal = () => {
    setShowModal(false);
    onSubmit();
  };

  const handleOpenModal = () => {
    const compare = compareObjects(initialData, formValues);
    const compareCompany = compareObjects(
      generalInformationRef.current?.initialValues,
      generalInformationRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleCloseGoBackModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate(-1);
  };
  const legalPersonIdent = legalPersonData.find(
    (item) =>
      item.payingEntityName === formValues.company?.values.companySelected,
  );

  const company = {
    identificationDocumentNumber: formValues.company?.values.companyNumberIdent,
    identificationTypeLegalPerson: formValues.company?.values.companyTypeIdent,
    payingEntityName: formValues.company?.values.companyName,
    tradename: formValues.company?.values.companyNameCommercial,
    countryTaxResidence: formValues.company?.values.companyCountry,
    headquarterCity: formValues.company?.values.companyCity,
    headquarterAddress: `${formValues.company?.values.companyAddressRes} _ ${formValues.company?.values.companyComplement}`,
    countryOfIdentityDocument: formValues.company?.values.companyCountryIdent,
  };

  const onSubmit = () => {
    const changedFields: {
      abbreviatedName?: string;
      applicationDaysPayroll?: string;
      payrollForDeductionAgreementType?: string;
      payingIdentification?: string;
      payingEntityName?: string;
      numberOfDaysForReceivingTheDiscounts?: number;
      identificationDocumentNumber?: string;
      company?: ILegalPerson;
      typePayroll?: string;
      payrollForDeductionAgreementId?: string;
      regularPaymentCycles?: IRegularPaymentCycles[];
      payrollSpecialBenefitPaymentCycles?: IPayrollSpecialBenefit[];
      severancePaymentCycles?: ISeverancePaymentCycles[];
      modifyJustification?: string;
      incomeTypes?: IIncomeTypes[];
    } = {
      payrollForDeductionAgreementId: data?.payrollForDeductionAgreementId,
      modifyJustification: jsonLabels(initialValues.abbreviatedName)
        .modifyJustification,
    };

    const hasChanges = Object.keys(changedFields).length > 0;

    if (
      formValues.generalInformation.values.abbreviatedName !==
      initialValues.abbreviatedName
    ) {
      changedFields.abbreviatedName =
        formValues.generalInformation.values.abbreviatedName;
    }

    if (
      formValues.generalInformation.values.applicationDaysPayroll !==
      initialValues.applicationDaysPayroll
    ) {
      changedFields.numberOfDaysForReceivingTheDiscounts =
        Number(formValues.generalInformation.values.applicationDaysPayroll) ||
        0;
    }

    if (newSourcesIncome().incomeTypes.length > 0) {
      changedFields.incomeTypes = newSourcesIncome().incomeTypes;
    }

    const regularPayments = newRegularPayment();
    if (regularPayments.length > 0) {
      changedFields.regularPaymentCycles = regularPayments;
    }

    const { severancePayment, payrollSpeBenPayment } =
      newExtraordinaryPayment();
    if (severancePayment.length > 0) {
      changedFields.severancePaymentCycles = severancePayment;
    }

    if (payrollSpeBenPayment.length > 0) {
      changedFields.payrollSpecialBenefitPaymentCycles = payrollSpeBenPayment;
    }

    if (option) {
      changedFields.abbreviatedName =
        formValues.generalInformation.values.abbreviatedName;
      changedFields.numberOfDaysForReceivingTheDiscounts =
        Number(formValues.generalInformation.values.applicationDaysPayroll) ||
        0;
      changedFields.incomeTypes = newSourcesIncome().incomeTypes;

      changedFields.payrollForDeductionAgreementType =
        formValues?.generalInformation?.values.typePayroll;

      if (
        formValues.company?.values.companySelected !==
        ECyclesPayroll.ADD_COMPANY
      ) {
        changedFields.payingEntityName =
          formValues.company?.values.companySelected;
        if (legalPersonIdent) {
          changedFields.payingIdentification =
            legalPersonIdent.identificationDocumentNumber;
        }
      }

      if (
        formValues.company?.values.companySelected ===
        ECyclesPayroll.ADD_COMPANY
      ) {
        changedFields.company = company as ILegalPerson;
      }
    }

    if (
      hasChanges ||
      newRegularPayment().length > 0 ||
      newExtraordinaryPayment().severancePayment.length > 0 ||
      newExtraordinaryPayment().payrollSpeBenPayment.length > 0
    ) {
      setSaveData({
        applicationName: EGeneral.APPLICATION_NAME,
        requestType: ERequestType.MODIFY,
        businessManagerCode: appData.businessManager.publicCode,
        businessUnitCode: appData.businessUnit.publicCode,
        description: jsonLabels(changedFields.abbreviatedName ?? "")
          .modifyJustification,
        entityName: conditionRule,
        requestDate: formatDate(new Date()),
        useCaseName: EPayrollAgreement.USE_CASE_EDIT,
        configurationRequestData: changedFields,
      });
      setShowRequestProcessModal(true);
    }
  };

  const typePayroll = typeRegularPayroll
    ? payrollType.ordinary
    : payrollType.extraordinary;

  const showGeneralInfPayrollForm =
    isSelected === editPayrollAgTabsConfig.generalInformation.id;

  const showCompanyPayrollForm =
    isSelected === editPayrollAgTabsConfig.company.id;

  const showRegularPaymentCyclesForm =
    typeRegularPayroll &&
    isSelected === editPayrollAgTabsConfig.regularPaymentCycles.id;

  const showExtraPaymentCyclesForm =
    isSelected === editPayrollAgTabsConfig.extraordinaryPaymentCycles.id;

  const filteredTabs = Object.values(filteredTabsConfig);

  return {
    companyAgreement,
    extraordinaryPayment,
    filteredTabs,
    filteredTabsConfig,
    formValues,
    generalInformationRef,
    includeExtraPayDay,
    initialData,
    typePayroll,
    isCurrentFormValid,
    isSelected,
    regularDeleted,
    regularPaymentCycles,
    saveData,
    showDeletedAlertModal,
    showExtraPaymentCyclesForm,
    showGeneralInfPayrollForm,
    showCompanyPayrollForm,
    showGoBackModal,
    showModal,
    showRegularPaymentCyclesForm,
    showRequestProcessModal,
    smallScreen,
    sourcesOfIncomeValues,
    typeRegularPayroll,
    companyRef,
    defaultSelectedTab,
    setCurrentTypePayroll,
    setIncludeExtraPayDay,
    setRegularDeleted,
    handleToggleDeletedAlertModal,
    setExtraordinaryPayment,
    setRegularPaymentCycles,
    setShowModal,
    handleCloseGoBackModal,
    setShowGoBackModal,
    handleGoBack,
    setShowRequestProcessModal,
    setSourcesOfIncomeValues,
    handleReset,
    onSubmit,
    setIsCurrentFormValid,
    handleTabChange,
    handleOpenModal,
    handleEditedModal,
    handleToggleEditedModal,
  };
};

export { useEditPayrollAgreement };
