import { useState, useEffect } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { IUseRequestsInProgress } from "@ptypes/hooks/IUseRequestsInProgress";

const useRequestsInProgress = (props: IUseRequestsInProgress) => {
  const { bussinesUnits } = props;
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [searchRequestsInProgress, setSearchRequestsInProgress] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entryCanceled, setEntryCanceled] = useState<string | number>("");

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      setLoading(true);
      try {
        const data = await getRequestsInProgress(
          bussinesUnits,
          "MoneyDestination",
        );
        setRequestsInProgress(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsInProgressData();
  }, []);

  useEffect(() => {
    if (entryCanceled) {
      setRequestsInProgress((prev) =>
        prev.filter((entry) => entry.id !== entryCanceled),
      );
    }
  }, [entryCanceled]);

  const handleSearchRequestsInProgress = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchRequestsInProgress(e.target.value);
  };

  const smallScreen = useMediaQuery("(max-width: 690px)");
  const widthFirstColumn = smallScreen ? 42 : 14;

  const columnWidths = smallScreen
    ? [widthFirstColumn, 30]
    : [widthFirstColumn, 50, 23];

  return {
    requestsInProgress,
    hasError,
    searchRequestsInProgress,
    loading,
    smallScreen,
    columnWidths,
    handleSearchRequestsInProgress,
    setEntryCanceled,
  };
};

export { useRequestsInProgress };
