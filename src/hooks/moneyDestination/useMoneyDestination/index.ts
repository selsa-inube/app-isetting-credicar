import { useState, useEffect } from "react";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { getMoneyDestinationData } from "@services/moneyDestination/getMoneyDestination";

const useMoneyDestination = (bussinesUnits: string) => {
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

  return {
    moneyDestination,
    hasError,
    searchMoneyDestination,
    loading,
    handleSearchMoneyDestination,
    setEntryDeleted,
  };
};

export { useMoneyDestination };
