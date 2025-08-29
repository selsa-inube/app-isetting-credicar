import { useMediaQuery } from "@inubekit/inubekit";
import { useState, useEffect } from "react";
import { getMoneyDestinationData } from "@services/moneyDestination/getMoneyDestination";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EMoneyDestination } from "@enum/moneyDestination";
import { tabLabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";
import { mediaQueryTablet } from "@config/environment";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { IUseMoneyDestination } from "@ptypes/hooks/moneyDestination/IUseMoneyDestination";

const useMoneyDestination = (props: IUseMoneyDestination) => {
  const { businessUnits } = props;
  const [moneyDestination, setMoneyDestination] = useState<
    IMoneyDestinationData[]
  >([]);
  const [hasError, setHasError] = useState(false);
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
    setShowInfoModal(!showInfoModal);
  };

  const smallScreen = useMediaQuery(mediaQueryTablet);
  const widthFirstColumn = smallScreen ? 72 : 80;

  const columnWidths = [widthFirstColumn];

  const emptyDataMessage = smallScreen
    ? tabLabels.emptyDataMessageMobile
    : tabLabels.emptyDataMessageDesk;

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
    handleToggleInfoModal,
    handleSearchMoneyDestination,
    setEntryDeleted,
  };
};

export { useMoneyDestination };
