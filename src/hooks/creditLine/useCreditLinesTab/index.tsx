import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
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

const useCreditLinesTab = (props: IUseCreditLinesTab) => {
  const { businessUnits } = props;
  const [businessRules] = useState<string[]>([]);
  const [creditLines, setPayrollAgreement] = useState<ICreditLinesData[]>([]);
  const [loadingRules] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [showDecision, setShowDecision] = useState(false);
  const [searchCreditLines, setSearchCreditLines] = useState<string>("");
  const [loadingCreditLines, setLoadingCreditLines] = useState<boolean>(true);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: ECreditLines.USE_CASE_ADD,
  });

  useEffect(() => {
    if (!loadingRules && businessRules && businessRules.length > 0) {
      return;
    }
    const fetchPayrollAgreementData = async () => {
      setLoadingCreditLines(true);
      try {
        const data = await getCreditLinesData(businessUnits);
        setPayrollAgreement(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoadingCreditLines(false);
      }
    };

    fetchPayrollAgreementData();
  }, [businessRules]);

  useEffect(() => {
    if (entryDeleted) {
      setPayrollAgreement((prev) =>
        prev.filter((entry) => entry.id !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const handleToggleInfoModal = () => {
    if (disabledButton && !hasError) {
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

  const widthFirstColumn = smallScreen ? 70 : 80;
  const columnWidths = [widthFirstColumn];

  const validateMissingRules = !loadingRules && businessRules.length === 0;

  const showIcon = !validateMissingRules || disabledButton;

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
    handleSearchCreditLines,
    handleToggleInfoModal,
    setEntryDeleted,
  };
};

export { useCreditLinesTab };
