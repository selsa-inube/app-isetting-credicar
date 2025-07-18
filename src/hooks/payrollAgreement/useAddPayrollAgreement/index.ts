import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { FormikProps } from "formik";

import { addPayrollAgreementSteps } from "@config/payrollAgreement/payrollAgreementTab/assisted/steps";
import { IAddPayrollAgreementForms } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IAddPayrollAgreementForms";
import { ICompanyEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyEntry";
import { IAddPayrollAgreementRef } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IAddPayrollAgreementRef";
import { IGeneralInformationEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayroll";
import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { typePayrollForCyclesExtraord } from "@config/payrollAgreement/payrollAgreementTab/assisted/typePayrollForCyclesExtraord";
import { compareObjects } from "@utils/compareObjects";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { formatDate } from "@utils/date/formatDate";
import { optionsFromEnumerators } from "@utils/optionsFromEnumerators";
import { IServerDomain } from "@ptypes/IServerDomain";
import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";
import { normalizeEnumTranslationCode } from "@utils/normalizeEnumTranslationCode";
import { IPayrollSpecialBenefit } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollSpecialBenefit";
import { ISeverancePaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/ISeverancePaymentCycles";
import { specialBenefitPayment } from "@config/payrollAgreement/payrollAgreementTab/assisted/specialBenefitPaymentCycles";
import { severancePay } from "@config/payrollAgreement/payrollAgreementTab/assisted/severancePaymentCycles";
import { IUseAddPayrollAgreement } from "@ptypes/hooks/IUseAddPayrollAgreement";
import { formatPaymentDay } from "@utils/formatPaymentDay";
import { checkDayWeek } from "@utils/checkDayWeek";
import { IIncomeTypes } from "@ptypes/payrollAgreement/RequestPayrollAgre/IIncomeTypes";
import { getIncomeTypesData } from "@utils/IncomeTypesData";
import { useLegalPerson } from "../useLegalPerson";
import { getUniquePaydays } from "@utils/getUniqueDays";
import { getDaysInNumber } from "@utils/getDaysInNumber";
import { getLastDayOfMonth } from "@utils/getLastDayOfMonth";
import { includedPeriodicity } from "@config/payrollAgreement/payrollAgreementTab/assisted/excludedPeriodicity";
import { useEnumeratorsIncome } from "@hooks/useEnumeratorsIncome";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { mediaQueryTablet } from "@config/environment";
import { addPayrollLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/addPayrollLabels";

const useAddPayrollAgreement = (props: IUseAddPayrollAgreement) => {
  const { appData } = props;
  const initialValues = {
    company: {
      isValid: false,
      values: {
        companySelected: "",
        companyName: "",
        companyTypeIdent: "",
        companyNumberIdent: "",
        companyNameCommercial: "",
        companyComplement: "",
        companyCity: "",
        companyAddressRes: "",
        companyCountry: "",
        companyCountryIdent: "",
      },
    },
    generalInformation: {
      isValid: false,
      values: {
        code: "",
        abbreviatedName: "",
        typePayroll: "",
        sourcesOfIncome: "",
        applicationDaysPayroll: "",
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
        },
      ],
    },
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] =
    useState<IAddPayrollAgreementForms>(initialValues);
  const [regularPaymentCycles, setRegularPaymentCycles] = useState<
    IOrdinaryCyclesEntry[]
  >([]);
  const [includeExtraPayDay, setIncludeExtraPayDay] = useState<
    IOrdinaryCyclesEntry[]
  >([]);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [extraordinaryPayment, setExtraordinaryPayment] = useState<
    IExtraordinaryCyclesEntry[]
  >([]);
  const [regularDeleted, setRegularDeleted] = useState<IOrdinaryCyclesEntry[]>(
    [],
  );
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [typeRegularPayroll, setTypeRegularPayroll] = useState<boolean>(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [sourcesOfIncomeValues, setSourcesOfIncomeValues] = useState<
    IServerDomain[]
  >([]);

  const { legalPersonData } = useLegalPerson({
    businessUnits: appData.businessUnit.publicCode,
  });

  const { enumData: incometype } = useEnumeratorsIncome({
    businessUnits: appData.businessUnit.publicCode,
  });
  const navigate = useNavigate();

  const smallScreen = useMediaQuery(mediaQueryTablet);

  const companyRef = useRef<FormikProps<ICompanyEntry>>(null);
  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const formReferences: IAddPayrollAgreementRef = {
    company: companyRef,
    generalInformation: generalInformationRef,
  };

  useEffect(() => {
    setSourcesOfIncomeValues(optionsFromEnumerators(incometype));
  }, [incometype]);

  useEffect(() => {
    setTypeRegularPayroll(
      typePayrollForCyclesExtraord.includes(
        formValues.generalInformation.values.typePayroll,
      )
        ? true
        : false,
    );
  }, [formValues.generalInformation.values.typePayroll]);

  const filterExtraordinaryPayment = (entries: IOrdinaryCyclesEntry[]) => {
    const filteredEntries = entries.filter((item) =>
      includedPeriodicity.includes(item.periodicity ?? ""),
    );

    const days = getUniquePaydays(filteredEntries);
    const daysInNumber = getDaysInNumber(days);
    const filteredExtraordinary: IExtraordinaryCyclesEntry[] = [];

    let verifyDays: number[] = [];
    let lastDayOfMonth: number[] = [];

    extraordinaryPayment.forEach((item) => {
      const month = Number(item.payday?.slice(0, 2));
      const paydayValue = Number(item.payday?.split("-")[1]);
      lastDayOfMonth = getLastDayOfMonth(days, month - 1);

      verifyDays = Array.from(new Set([...daysInNumber, ...lastDayOfMonth]));

      const filteredRegularPaymentCycles = regularPaymentCycles.flatMap(
        (item) => {
          const filteredPayday = item.payday
            ? item.payday.split(",").map((payday) => Number(payday.trim()))
            : [];
          return filteredPayday.filter((payday) => verifyDays.includes(payday));
        },
      );

      if (filteredRegularPaymentCycles.length > 0) {
        verifyDays = verifyDays.filter(
          (day) => !filteredRegularPaymentCycles.includes(day),
        );
      }

      if (!verifyDays.includes(paydayValue)) {
        filteredExtraordinary.push(item);
      }
    });

    return {
      filteredExtraordinary,
    };
  };

  useEffect(() => {
    if (regularDeleted && regularDeleted.length > 0) {
      const { filteredExtraordinary } =
        filterExtraordinaryPayment(regularDeleted);
      setExtraordinaryPayment((prev) =>
        prev.filter((item) => {
          return filteredExtraordinary.some(
            (filteredItem) =>
              filteredItem.id === item.id &&
              item.nameCycle === filteredItem.nameCycle,
          );
        }),
      );
    }
  }, [regularDeleted]);

  const handleNextStep = () => {
    if (currentStep < addPayrollAgreementSteps.length) {
      if (companyRef.current) {
        setFormValues((prevValues) => ({
          ...prevValues,
          company: {
            ...prevValues.company,
            values: companyRef.current!.values,
          },
        }));
        setIsCurrentFormValid(companyRef.current.isValid);
        setCurrentStep(currentStep + 1);
      }

      if (generalInformationRef.current) {
        setFormValues((prevValues) => ({
          ...prevValues,
          generalInformation: {
            ...prevValues.generalInformation,
            values: generalInformationRef.current!.values,
          },
        }));
        setIsCurrentFormValid(generalInformationRef.current.isValid);
        const showOrdinary = typePayrollForCyclesExtraord.includes(
          generalInformationRef.current.values.typePayroll,
        );

        const stepOrdinaryCycles = showOrdinary ? currentStep + 1 : 4;
        setCurrentStep(stepOrdinaryCycles);
      } else {
        setCurrentStep(currentStep + 1);
      }

      if (currentStep === 3) {
        setFormValues((prevValues) => ({
          ...prevValues,
          ordinaryCycles: {
            ...prevValues.ordinaryCycles,
            values: regularPaymentCycles ?? [],
          },
        }));
        const step = includeExtraPayDay.length === 0 ? 5 : currentStep + 1;
        setIsCurrentFormValid(true);
        setCurrentStep(step);
      }

      if (currentStep === 4) {
        setFormValues((prevValues) => ({
          ...prevValues,
          extraordinaryCycles: {
            ...prevValues.extraordinaryCycles,
            values: extraordinaryPayment ?? [],
          },
        }));
        setIsCurrentFormValid(true);
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }

    if (currentStep === 4) {
      const stepOrdinaryCycles = typeRegularPayroll ? currentStep - 1 : 2;
      setCurrentStep(stepOrdinaryCycles);
    }

    if (currentStep === 5) {
      const stepOrdinaryCycles =
        includeExtraPayDay.length === 0 ? 3 : currentStep - 1;
      setCurrentStep(stepOrdinaryCycles);
    }
  };

  const handleOpenModal = () => {
    const compare = compareObjects(initialValues, formValues);
    const compareCompany = compareObjects(
      companyRef.current?.initialValues,
      companyRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleCloseModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate(-1);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialValues, formValues) ||
        (companyRef.current &&
          !compareObjects(
            companyRef.current.initialValues,
            companyRef.current.values,
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
  }, [formValues, initialValues, companyRef, canRefresh]);

  const formValid =
    (regularPaymentCycles && regularPaymentCycles.length > 0) ||
    (extraordinaryPayment && extraordinaryPayment.length > 0)
      ? false
      : !isCurrentFormValid;

  const company = {
    identificationDocumentNumber: formValues.company.values.companyNumberIdent,
    identificationTypeLegalPerson: formValues.company.values.companyTypeIdent,
    payingEntityName: formValues.company.values.companyName,
    tradename: formValues.company.values.companyNameCommercial,
    countryTaxResidence: formValues.company.values.companyCountry,
    headquarterCity: formValues.company.values.companyCity,
    headquarterAddress: `${formValues.company.values.companyAddressRes} - ${formValues.company.values.companyComplement}`,
    countryOfIdentityDocument: formValues.company.values.companyCountryIdent,
  };

  const regularPayment = formValues.ordinaryCycles.values
    .filter((item) => item.cycleId !== "")
    .map((item) => ({
      regularPaymentCycleNumber: item.cycleId,
      regularPaymentCycleName: item.nameCycle,
      schedule:
        normalizeEnumTranslationCode(item.periodicity ?? "")?.code ??
        item.periodicity,
      paymentDay: checkDayWeek(item.payday ?? ""),
      numberOfDaysBeforePaymentToBill: Number(item.numberDaysUntilCut),
    }));

  const payrollSpecialBenefit = formValues.extraordinaryCycles.values
    .filter((item) => specialBenefitPayment.includes(item.typePayment))
    .map((item) => ({
      abbreviatedName: item.nameCycle,
      numberOfDaysBeforePaymentToBill: Number(item.numberDaysUntilCut),
      paymentDay: formatPaymentDay(item.payday ?? "") ?? "",
    }));

  const severancePayment = formValues.extraordinaryCycles.values
    .filter((item) => severancePay.includes(item.typePayment))
    .map((item) => ({
      abbreviatedName: item.nameCycle,
      numberOfDaysBeforePaymentToBill: Number(item.numberDaysUntilCut),
      paymentDay: formatPaymentDay(item.payday ?? "") ?? "",
    }));

  const handleSubmitClick = () => {
    const legalPersonIdent = legalPersonData.find(
      (item) =>
        item.payingEntityName === formValues.company.values.companySelected,
    );

    const configurationRequestData: {
      payrollForDeductionAgreementCode?: string;
      abbreviatedName?: string;
      numberOfDaysForReceivingTheDiscounts?: number;
      payrollForDeductionAgreementType?: string;
      payingIdentification?: string;
      payingEntityName?: string;
      company?: ILegalPerson;
      regularPaymentCycles?: IOrdinaryCyclesEntry[];
      payrollSpecialBenefitPaymentCycles?: IPayrollSpecialBenefit[];
      severancePaymentCycles?: ISeverancePaymentCycles[];
      incomeTypes?: IIncomeTypes[];
    } = {
      payrollForDeductionAgreementCode:
        formValues.generalInformation.values.code,
      abbreviatedName: formValues.generalInformation.values.abbreviatedName,
      numberOfDaysForReceivingTheDiscounts: Number(
        formValues.generalInformation.values.applicationDaysPayroll,
      ),
      payrollForDeductionAgreementType:
        formValues.generalInformation.values.typePayroll,
      incomeTypes: getIncomeTypesData(
        formValues.generalInformation.values.sourcesOfIncome,
      ),
    };

    if (
      formValues.company.values.companySelected !== ECyclesPayroll.ADD_COMPANY
    ) {
      configurationRequestData.payingEntityName =
        formValues.company.values.companySelected;
      if (legalPersonIdent) {
        configurationRequestData.payingIdentification =
          legalPersonIdent.identificationDocumentNumber;
      }
    }

    if (
      formValues.company.values.companySelected ===
        ECyclesPayroll.ADD_COMPANY &&
      company.identificationDocumentNumber
    ) {
      configurationRequestData.company = company as ILegalPerson;
    }

    if (formValues.extraordinaryCycles.values.length > 0) {
      if (severancePayment.length > 0) {
        configurationRequestData.severancePaymentCycles = severancePayment;
      }
      if (payrollSpecialBenefit.length > 0) {
        configurationRequestData.payrollSpecialBenefitPaymentCycles =
          payrollSpecialBenefit;
      }
    }

    if (regularPayment.length > 0) {
      configurationRequestData.regularPaymentCycles = regularPayment;
    }

    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: addPayrollLabels.descriptionSaveData,
      entityName: "PayrollAgreement",
      requestDate: formatDate(new Date()),
      useCaseName: "AddPayrollAgreement",
      configurationRequestData,
    });
    setShowRequestProcessModal(!showRequestProcessModal);
  };

  return {
    currentStep,
    formValues,
    formReferences,
    formValid,
    showGoBackModal,
    sourcesOfIncomeValues,
    smallScreen,
    regularPaymentCycles,
    isCurrentFormValid,
    extraordinaryPayment,
    typeRegularPayroll,
    showModal,
    showRequestProcessModal,
    saveData,
    includeExtraPayDay,
    regularDeleted,
    setIncludeExtraPayDay,
    handleToggleModal,
    setExtraordinaryPayment,
    setSourcesOfIncomeValues,
    setRegularPaymentCycles,
    setRegularDeleted,
    handleNextStep,
    handlePreviousStep,
    setCurrentStep,
    setIsCurrentFormValid,
    handleGoBack,
    handleOpenModal,
    handleCloseModal,
    setShowModal,
    setShowRequestProcessModal,
    handleSubmitClick,
  };
};

export { useAddPayrollAgreement };
