import { useMediaQuery } from "@inubekit/inubekit";
import { useState, useEffect } from "react";
import { getMoneyDestinationData } from "@services/moneyDestination/getMoneyDestination";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { useEmptyDataMessage } from "@hooks/emptyDataMessage";
import { EMoneyDestination } from "@enum/moneyDestination";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { tabLabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";
import { disabledModal } from "@config/disabledModal";
import { errorModal } from "@config/errorModal";
import { mediaQueryTablet } from "@config/environment";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { IUseMoneyDestination } from "@ptypes/hooks/moneyDestination/IUseMoneyDestination";
import { IErrors } from "@ptypes/IErrors";
import { IEntry } from "@ptypes/design/table/IEntry";

const useMoneyDestination = (props: IUseMoneyDestination) => {
  const { businessUnits } = props;
  const [moneyDestination, setMoneyDestination] = useState<
    IMoneyDestinationData[]
  >([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [showDecision, setShowDecision] = useState(false);
  const [searchMoneyDestination, setSearchMoneyDestination] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");

  const { disabledButton } = useValidateUseCase({
    useCase: EMoneyDestination.USE_CASE_ADD,
  });

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const data = await getMoneyDestinationData(businessUnits);
        setMoneyDestination(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoading(false);
      }
    };

    fetchEnumData();
  }, []);

  useEffect(() => {
    if (entryDeleted) {
      setMoneyDestination((prev) =>
        prev.filter((entry) => entry.id !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const handleSearchMoneyDestination = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchMoneyDestination(e.target.value);
  };

  const handleToggleInfoModal = () => {
    if (disabledButton && !hasError) {
      setShowInfoModal(!showInfoModal);
    }
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
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
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
    };

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
      };
    }

    if (showInfoModal && !hasError) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
      };
    }

    return initial;
  };

  const modalData = modal();

  const smallScreen = useMediaQuery(mediaQueryTablet);
  const widthFirstColumn = smallScreen ? 72 : 80;

  const columnWidths = [widthFirstColumn];

  const emptyDataMessage = useEmptyDataMessage({
    loading,
    errorData,
    data: moneyDestination as Omit<IEntry[], "id">,
    smallScreen,
    message: tabLabels,
  });

  return {
    moneyDestination,
    hasError,
    searchMoneyDestination,
    loading,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    showInfoModal,
    showDecision,
    modalData,
    handleToggleInfoModal,
    handleSearchMoneyDestination,
    setEntryDeleted,
  };
};

export { useMoneyDestination };
