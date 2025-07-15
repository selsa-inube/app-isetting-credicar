import { useMediaQuery } from "@inubekit/inubekit";
import { useState, useEffect } from "react";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { getMoneyDestinationData } from "@services/moneyDestination/getMoneyDestination";
import { IUseMoneyDestination } from "@ptypes/hooks/moneyDestination/IUseMoneyDestination";
import { tabLabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";

const useMoneyDestination = (props: IUseMoneyDestination) => {
  const { bussinesUnits } = props;
  const [moneyDestination, setMoneyDestination] = useState<
    IMoneyDestinationData[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [searchMoneyDestination, setSearchMoneyDestination] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const data = await getMoneyDestinationData(bussinesUnits);
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

  const smallScreen = useMediaQuery("(max-width: 990px)");
  const widthFirstColumn = smallScreen ? 72 : 25;

  const columnWidths = [widthFirstColumn, 55];

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
    handleSearchMoneyDestination,
    setEntryDeleted,
  };
};

export { useMoneyDestination };
