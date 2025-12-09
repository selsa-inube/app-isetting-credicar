import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { getPayrollAgreementData } from "@services/payrollAgreement/getPayrollAgreement";
import { useEmptyDataMessage } from "@hooks/emptyDataMessage";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { getDescriptionError } from "@utils/getDescriptionError";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { EComponentAppearance } from "@enum/appearances";
import { payrollTabLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/payrollTabLabels";
import { mediaQueryTablet } from "@config/environment";
import { disabledModal } from "@config/disabledModal";
import { errorModal } from "@config/errorModal";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { IUsePayrollAgreementTab } from "@ptypes/hooks/payrollAgreement/IUsePayrollAgreementTab";

const usePayrollAgreementTab = (props: IUsePayrollAgreementTab) => {
  const { businessUnits } = props;
  const [payrollAgreement, setPayrollAgreement] = useState<
    IPayrollAgreementData[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [showDecision, setShowDecision] = useState(false);
  const [searchPayrollAgreement, setSearchPayrollAgreement] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: EPayrollAgreement.USE_CASE_ADD,
  });

  useEffect(() => {
    const fetchPayrollAgreementData = async () => {
      setLoading(true);
      try {
        const data = await getPayrollAgreementData(businessUnits);
        setPayrollAgreement(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollAgreementData();
  }, []);

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

  const handleSearchPayrollAgreement = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchPayrollAgreement(e.target.value);
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
      moreDetails: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && hasError) {
      return {
        ...errorModal(
          messageErrorStatusConsultation(
            errorData.status,
            getDescriptionError(errorData.response),
          ),
        ),
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

  const smallScreen = useMediaQuery(mediaQueryTablet);
  const columnWidths = smallScreen ? [20, 53] : [20, 60];

  const emptyDataMessage = useEmptyDataMessage({
    loading,
    errorData,
    data: payrollAgreement as Omit<IEntry[], "id">,
    smallScreen,
    message: payrollTabLabels,
  });

  return {
    payrollAgreement,
    searchPayrollAgreement,
    loading,
    hasError,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    showInfoModal,
    modalData,
    showDecision,
    handleToggleInfoModal,
    setEntryDeleted,
    handleSearchPayrollAgreement,
  };
};

export { usePayrollAgreementTab };
