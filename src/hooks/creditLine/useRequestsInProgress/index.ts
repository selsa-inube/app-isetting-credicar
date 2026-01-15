import { useMediaQuery } from "@inubekit/inubekit";
import { useState, useEffect, useContext } from "react";

import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { ERequestInProgress } from "@enum/requestInProgress";
import { mediaQueryMobile } from "@config/environment";
import { IUseRequestsInProgress } from "@ptypes/hooks/creditLines/IUseRequestsInProgress";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

const useRequestsInProgress = (props: IUseRequestsInProgress) => {
  const { businessUnits, businessManager, token } = props;
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [searchRequestsInProgress, setSearchRequestsInProgress] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entryCanceled, setEntryCanceled] = useState<string | number>("");
  const { setFilterRules } = useContext(CreditLinesConstruction);

  useEffect(() => {
    setFilterRules([]);
  }, []);

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      setLoading(true);
      try {
        if (businessManager.length > 0) {
          const data = await getRequestsInProgress(
            businessManager,
            businessUnits,
            ERequestInProgress.CREDIT_LINE,
            token,
          );
          setRequestsInProgress(data as IRequestsInProgress[]);
        }
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsInProgressData();
  }, [businessManager, businessUnits]);

  useEffect(() => {
    if (entryCanceled) {
      setRequestsInProgress((prev) =>
        prev.filter((entry) => entry.settingRequestId !== entryCanceled),
      );
    }
  }, [entryCanceled]);

  const handleSearchRequestsInProgress = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchRequestsInProgress(e.target.value);
  };

  const smallScreen = useMediaQuery(mediaQueryMobile);
  const widthFirstColumn = smallScreen ? 60 : 15;

  const columnWidths = smallScreen ? [60, 20, 23] : [widthFirstColumn, 50, 23];

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
