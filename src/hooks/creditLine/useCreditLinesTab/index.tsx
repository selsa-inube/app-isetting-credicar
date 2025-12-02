import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { getCreditLinesData } from "@services/creditLines/getCreditLinesData";
import { useEmptyDataMessage } from "@hooks/emptyDataMessage";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { EComponentAppearance } from "@enum/appearances";
import { ECreditLines } from "@enum/creditLines";
import { mediaQueryMobile } from "@config/environment";
import { disabledModal } from "@config/disabledModal";
import { errorModal } from "@config/errorModal";
import { creditTabLabels } from "@config/creditLines/creditLinesTab/generic/creditTabLabels";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";
import { ICreditLinesData } from "@ptypes/creditLines/ICreditLinesData";
import { IUseCreditLinesTab } from "@ptypes/hooks/creditLines/IUseCreditLinesTab";
import { useValidateRules } from "../useValidateRules";

const useCreditLinesTab = (props: IUseCreditLinesTab) => {
  const { businessUnits } = props;
  const [creditLines, setCreditLines] = useState<ICreditLinesData[]>([]);
  const [loadingRules] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [showDecision, setShowDecision] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchCreditLines, setSearchCreditLines] = useState<string>("");
  const [loadingCreditLines, setLoadingCreditLines] = useState<boolean>(true);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: ECreditLines.USE_CASE_ADD,
  });

  const { setLinesConstructionData, setFilterRules } = useContext(
    CreditLinesConstruction,
  );

  useEffect(() => {
    setLinesConstructionData({
      settingRequestId: "",
      abbreviatedName: "",
      alias: "",
      descriptionUse: "",
      lineOfCreditId: "",
      rules: [],
    });

    setFilterRules([]);
  }, []);

  const { businessRules } = useValidateRules();

  useEffect(() => {
    if (!loadingRules && businessRules && businessRules.length > 0) {
      return;
    }
    const fetchCreditLinesData = async () => {
      setLoadingCreditLines(true);
      try {
        const data = await getCreditLinesData(businessUnits);
        setCreditLines(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoadingCreditLines(false);
      }
    };

    fetchCreditLinesData();
  }, [businessRules]);

  useEffect(() => {
    if (entryDeleted) {
      setCreditLines((prev) =>
        prev.filter((entry) => entry.lineOfCreditId !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const disabledAdd = disabledButton || businessRules.length > 0;

  const handleToggleInfoModal = () => {
    if (disabledAdd && !hasError) {
      setShowInfoModal(!showInfoModal);
    } else {
      setHasError(!hasError);
    }
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
  };

  const handleSearchCreditLines = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCreditLines(e.target.value);
  };

  useEffect(() => {
    const decision = showInfoModal || hasError;
    setShowDecision(decision);
  }, [showInfoModal, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loadingCreditLines && hasError) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showInfoModal && !hasError) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();

  const smallScreen = useMediaQuery(mediaQueryMobile);

  const emptyDataMessage = useEmptyDataMessage({
    loading: loadingCreditLines,
    errorData,
    data: creditLines as Omit<IEntry[], "id">,
    smallScreen: false,
    message: creditTabLabels,
  });

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const widthFirstColumn = smallScreen ? 70 : 80;
  const columnWidths = [widthFirstColumn];

  const validateMissingRules = !loadingRules && businessRules.length === 0;

  const showIcon = disabledButton || !validateMissingRules;

  const hasBusinessRules = businessRules && businessRules.length > 0;

  return {
    creditLines,
    loadingCreditLines,
    hasError,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    modalData,
    showDecision,
    searchCreditLines,
    businessRules,
    loadingRules,
    validateMissingRules,
    showIcon,
    hasBusinessRules,
    showAddModal,
    disabledAdd,
    setShowAddModal,
    handleToggleAddModal,
    handleSearchCreditLines,
    handleToggleInfoModal,
    setEntryDeleted,
  };
};

export { useCreditLinesTab };
