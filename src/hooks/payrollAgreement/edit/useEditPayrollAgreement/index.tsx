import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { FormikProps } from "formik";

import { editPayrollAgTabsConfig } from "@config/payrollAgreement/payrollAgreementTab/edit/tab";
import { IGeneralInformationEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayroll";
import { IEditPayrollAgreementForms } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IEditPayrollAgreementForms";
import { IServerDomain } from "@ptypes/IServerDomain";
import { optionsFromEnumerators } from "@utils/optionsFromEnumerators";
import { useEnumerators } from "@hooks/useEnumerators";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { compareObjects } from "@utils/compareObjects";
import { formatDate } from "@utils/date/formatDate";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { addLeadingZero } from "@utils/addLeadingZero";
import { typePayrollForCyclesExtraord } from "@config/payrollAgreement/payrollAgreementTab/assisted/typePayrollForCyclesExtraord";
import { IEditPayrollTabsConfig } from "@ptypes/payrollAgreement/payrollAgreementTab/IEditPayrollTabsConfig";
import { IPayrollSpecialBenefit } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollSpecialBenefit";
import { ISeverancePaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/ISeverancePaymentCycles";
import { IRegularPaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/IRegularPaymentCycles";
import { severancePay } from "@config/payrollAgreement/payrollAgreementTab/assisted/severancePaymentCycles";
import { IUseEditPayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseEditPayrollAgreement";
import { specialBenefitPayment } from "@config/payrollAgreement/payrollAgreementTab/assisted/specialBenefitPaymentCycles";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { deletedAlertModal } from "@config/payrollAgreement/payrollAgreementTab/generic/deletedAlertModal";
import { dataTranslations } from "@utils/dataTranslations";
import { IIncomeTypes } from "@ptypes/payrollAgreement/RequestPayrollAgre/IIncomeTypes";
import { includedPeriodicity } from "@config/payrollAgreement/payrollAgreementTab/assisted/excludedPeriodicity";
import { getSourcesIncome } from "@utils/getSourcesIncome";
import { getDayPayment } from "@utils/getDayPayment";
import { jsonLabels } from "@config/payrollAgreement/payrollAgreementTab/edit/jsonlLabels";
import { mediaQueryMobile } from "@config/environment";
import { payrollType } from "@config/payrollAgreement/payrollAgreementTab/edit/typePayroll";
import { useManagePayrollCycles } from "../useManagePayrollCycles";

const useEditPayrollAgreement = (props: IUseEditPayrollAgreement) => {
  const { data } = props;

  const regularPaymentValues = () => {
    if (data.regularPaymentCycles) {
      return data.regularPaymentCycles.map((entry, index) => ({
        id: String(index + 1),
        cycleId: `cycle-${addLeadingZero(index + 1).toString()}`,
        nameCycle: entry.regularPaymentCycleName,
        periodicity: dataTranslations[entry.schedule] ?? entry.schedule,
        payday: getDayPayment(entry.paymentDay),
        numberDaysUntilCut: Number(entry.numberOfDaysBeforePaymentToBill),
      }));
    } else {
      return [];
    }
  };

  const extraordinaryPaymentValues = () => {
    let extraordinary: IExtraordinaryCyclesEntry[] = [];
    if (data.payrollSpecialBenefitPaymentCycles) {
      extraordinary = extraordinary.concat(
        Object.entries(data.payrollSpecialBenefitPaymentCycles).length > 0
          ? data.payrollSpecialBenefitPaymentCycles.map((entry, index) => {
              return {
                id: `cycle-special-benefit-${addLeadingZero(index + 1).toString()}`,
                nameCycle: entry.abbreviatedName,
                typePayment: specialBenefitPayment[0],
                payday: getDayPayment(entry.paymentDay),
                numberDaysUntilCut: String(
                  entry.numberOfDaysBeforePaymentToBill,
                ),
              };
            })
          : [],
      );
    }
    if (data.severancePaymentCycles) {
      extraordinary = extraordinary.concat(
        Object.entries(data.severancePaymentCycles).length > 0
          ? data.severancePaymentCycles.map((entry, index) => {
              return {
                id: `cycle-severance-${addLeadingZero(index + 1).toString()}`,
                nameCycle: entry.abbreviatedName,
                typePayment: severancePay[0],
                payday: getDayPayment(entry.paymentDay),
                numberDaysUntilCut: String(
                  entry.numberOfDaysBeforePaymentToBill,
                ),
              };
            })
          : [],
      );
    }
    return extraordinary;
  };

  const initialData = {
    generalInformation: {
      isValid: false,
      values: {
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
  const conditionRule = "PayrollAgreement";
  const smallScreen = useMediaQuery(mediaQueryMobile);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const { enumData: incometype } = useEnumerators({
    enumDestination: "incometype",
    businessUnits: appData.businessUnit.publicCode,
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
        !regularPaymentCycles.some(
          (e) =>
            e.periodicity !== undefined &&
            includedPeriodicity.includes(e.periodicity),
        )
      ) {
        return acc;
      }

      if (tab !== undefined) {
        acc[key as keyof IEditPayrollTabsConfig] = tab;
      }
      return acc;
    }, {} as IEditPayrollTabsConfig);
  }, [regularPaymentValues]);

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
    if (generalInformationRef.current?.values) {
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

    if (generalInformationRef.current?.values) {
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
      sourcesOfIncome?: string;
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

    (
      ["abbreviatedName", "sourcesOfIncome", "applicationDaysPayroll"] as const
    ).forEach((key) => {
      if (formValues.generalInformation.values[key] !== initialValues[key]) {
        changedFields[key] = formValues.generalInformation.values[key];
      }
    });

    const hasChanges = Object.keys(changedFields).length > 0;

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
        applicationName: "ifac",
        businessManagerCode: appData.businessManager.publicCode,
        businessUnitCode: appData.businessUnit.publicCode,
        description: "Solicitud de modificación de una nómina de convenio",
        entityName: conditionRule,
        requestDate: formatDate(new Date()),
        useCaseName: "ModifyPayrollAgreement",
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

  const { title, description, actionText, moreDetails } =
    deletedAlertModal(typePayroll);

  return {
    actionText,
    companyAgreement,
    description,
    extraordinaryPayment,
    filteredTabs,
    filteredTabsConfig,
    formValues,
    generalInformationRef,
    includeExtraPayDay,
    initialData,
    isCurrentFormValid,
    isSelected,
    moreDetails,
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
    title,
    typePayroll,
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
