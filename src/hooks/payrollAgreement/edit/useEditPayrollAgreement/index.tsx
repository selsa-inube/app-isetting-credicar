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
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { ERequestType } from "@enum/requestType";
import { EGeneral } from "@enum/general";
import { dataTranslations } from "@utils/dataTranslations";
import { getDayPayment } from "@utils/getDayPayment";
import { transformToArray } from "@utils/transformToArray";
import { includedPeriodicity } from "@config/payrollAgreement/payrollAgreementTab/assisted/excludedPeriodicity";
import { formatPaymentDayExtra } from "@utils/formatPaymentDayExtra";
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
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { useManagePayrollCycles } from "../useManagePayrollCycles";

const useEditPayrollAgreement = (props: IUseEditPayrollAgreement) => {
  const { data } = props;

  const regularPaymentValues = () => {
    const cycles = transformToArray<IRegularPaymentCycles>(
      data.regularPaymentCycles,
    );

    return cycles.map((entry, index) => ({
      id: String(index + 1),
      cycleId: `${addLeadingZero(index + 1).toString()}`,
      nameCycle: entry.regularPaymentCycleName,
      periodicity: dataTranslations[entry.schedule] ?? entry.schedule,
      payday: getDayPayment(entry.paymentDay),
      numberDaysUntilCut: Number(entry.numberOfDaysBeforePaymentToBill),
      laborRegulatorFramework: entry.regulatoryFrameworkCode ?? "",
    }));
  };

  const extraordinaryPaymentValues = () => {
    const specials = transformToArray<IPayrollSpecialBenefit>(
      data.payrollSpecialBenefitPaymentCycles,
    ).map((entry, index) => ({
      id: `cycle-special-benefit-${addLeadingZero(index + 1).toString()}`,
      nameCycle: entry.abbreviatedName,
      typePayment: specialBenefitPayment[0],
      payday: formatPaymentDayExtra(entry.paymentDay) ?? entry.paymentDay,
      numberDaysUntilCut: String(entry.numberOfDaysBeforePaymentToBill),
      laborRegulatorFramework: entry.regulatoryFrameworkCode ?? "",
    }));

    const severances = transformToArray<ISeverancePaymentCycles>(
      data.severancePaymentCycles,
    ).map((entry, index) => ({
      id: `cycle-severance-${addLeadingZero(index + 1).toString()}`,
      nameCycle: entry.abbreviatedName,
      typePayment: severancePay[0],
      payday: formatPaymentDayExtra(entry.paymentDay),
      numberDaysUntilCut: String(entry.numberOfDaysBeforePaymentToBill),
      laborRegulatorFramework: entry.regulatoryFrameworkCode ?? "",
    }));

    return [...specials, ...severances];
  };

  const initialData = {
    generalInformation: {
      isValid: false,
      values: {
        code: data.payrollForDeductionAgreementCode,
        abbreviatedName: data.abbreviatedName ?? "",
        typePayroll:
          dataTranslations[data.payrollForDeductionAgreementType] ??
          data.payrollForDeductionAgreementType,
        sourcesOfIncome: getSourcesIncome(data.incomeTypes),
        applicationDaysPayroll: String(
          data.numberOfDaysForReceivingTheDiscounts ?? 0,
        ),
      },
    },
    ordinaryCycles: {
      isValid: false,
      values: regularPaymentValues(),
    },
    extraordinaryCycles: {
      isValid: false,
      values: extraordinaryPaymentValues(),
    },
  };

  const companyAgreement = data.payingEntityName ?? "";
  const { appData } = useContext(AuthAndPortalData);
  const [isSelected, setIsSelected] = useState<string>(
    editPayrollAgTabsConfig.generalInformation.id,
  );
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
  >(extraordinaryPaymentValues());
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

  const initialValues = initialData.generalInformation.values;

  const navigate = useNavigate();
  const conditionRule = EPayrollAgreement.CONDITION_RULE;
  const smallScreen = useMediaQuery(mediaQueryMobile);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const { enumData: incometype } = useEnumeratorsIncome({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const { newRegularPayment, newExtraordinaryPayment, newSourcesIncome } =
    useManagePayrollCycles({
      initialData,
      regularPaymentCycles,
      isSelected,
      extraordinaryPayment,
      setExtraordinaryPayment,
      sourcesOfIncome: formValues.generalInformation.values.sourcesOfIncome,
      initialSourcesOfIncome: initialValues.sourcesOfIncome,
      payrollId: data.payrollForDeductionAgreementId,
    });

  useEffect(() => {
    setTypeRegularPayroll(
      typePayrollForCyclesExtraord.includes(
        formValues.generalInformation.values.typePayroll,
      )
        ? true
        : false,
    );
  }, []);

  const extraordinaryData = extraordinaryPaymentValues();

  const shouldHideExtraordinaryTab = useMemo(() => {
    const hasValidPeriodicity = regularPaymentCycles.some((cycle) => {
      const isValidPeriodicity =
        cycle.periodicity !== undefined &&
        includedPeriodicity.includes(cycle.periodicity);
      return isValidPeriodicity;
    });

    return !hasValidPeriodicity && extraordinaryData.length === 0;
  }, [extraordinaryData, regularPaymentCycles, includedPeriodicity]);

  const filteredTabsConfig = useMemo(() => {
    return Object.keys(editPayrollAgTabsConfig).reduce((acc, key) => {
      const tab =
        editPayrollAgTabsConfig[key as keyof typeof editPayrollAgTabsConfig];

      const ordinaryData = regularPaymentValues();
      if (
        key === editPayrollAgTabsConfig.regularPaymentCycles.id &&
        ordinaryData.length === 0
      ) {
        return acc;
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
  }, [regularPaymentValues, extraordinaryPaymentValues, regularPaymentCycles]);

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

  const onSubmit = () => {
    const changedFields: {
      abbreviatedName?: string;
      applicationDaysPayroll?: string;
      numberOfDaysForReceivingTheDiscounts?: number;
      payrollForDeductionAgreementId?: string;
      regularPaymentCycles?: IRegularPaymentCycles[];
      payrollSpecialBenefitPaymentCycles?: IPayrollSpecialBenefit[];
      severancePaymentCycles?: ISeverancePaymentCycles[];
      modifyJustification?: string;
      incomeTypes?: IIncomeTypes[];
    } = {
      payrollForDeductionAgreementId: data.payrollForDeductionAgreementId,
      modifyJustification: jsonLabels(appData.user.userAccount)
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
        description: jsonLabels(appData.user.userAccount).modifyJustification,
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
    showGoBackModal,
    showModal,
    showRegularPaymentCyclesForm,
    showRequestProcessModal,
    smallScreen,
    sourcesOfIncomeValues,
    typeRegularPayroll,
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
