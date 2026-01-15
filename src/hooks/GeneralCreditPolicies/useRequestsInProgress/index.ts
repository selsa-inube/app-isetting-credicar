import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { useState, useEffect } from "react";

import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useEnumRequest } from "@hooks/useEnumRequest";
import { ERequestInProgress } from "@enum/requestInProgress";
import { mediaQueryMobile } from "@config/environment";
import { IUseRequestsInProgress } from "@ptypes/hooks/IUseRequestsInProgress";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

const useRequestsInProgress = (props: IUseRequestsInProgress) => {
  const { businessManager, businessUnits, token } = props;
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
    token,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (enumsRequests.length === 0) return;

    const fetchRequestsInProgressData = async () => {
      setLoading(true);
      try {
        if (businessManager.length > 0) {
          const data = await getRequestsInProgress(
            businessManager,
            businessUnits,
            ERequestInProgress.GENERAL_CREDIT_POLICIES,
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
      setRequestsInProgress((prev) => {
        const updatedRequests = prev.filter(
          (entry) => entry.settingRequestId !== entryCanceled,
        );

        if (updatedRequests.length === 0) {
          navigate("/");
        }

        return updatedRequests;
      });
    }
  }, [entryCanceled, navigate]);

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
