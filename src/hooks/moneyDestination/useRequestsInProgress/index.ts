import { useState, useEffect } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useEnumRequest } from "@hooks/useEnumRequest";
import { ERequestInProgress } from "@enum/requestInProgress";
import { mediaQueryMobile } from "@config/environment";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUseRequestsInProgress } from "@ptypes/hooks/IUseRequestsInProgress";

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
  const { enumsRequests } = useEnumRequest({
    businessUnits,
    enumerator: ERequestInProgress.REQUEST_STATUS,
    token: token,
  });

  useEffect(() => {
    if (enumsRequests.length === 0) return;

    const fetchRequestsInProgressData = async () => {
      setLoading(true);
      try {
        if (businessManager.length > 0) {
          const data = await getRequestsInProgress(
            businessManager,
            businessUnits,
            ERequestInProgress.MONEY_DESTINATION,
            token,
          );
          setRequestsInProgress(data);
        }
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsInProgressData();
  }, [enumsRequests, businessManager]);

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
