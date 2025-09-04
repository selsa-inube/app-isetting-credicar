import { useMemo } from "react";
import { IUseEmptyDataMessage } from "@ptypes/hooks/IUseEmptyDataMessage";

const useEmptyDataMessage = (props: IUseEmptyDataMessage) => {
  const { loading, data, errorData, smallScreen, message } = props;
  return useMemo(() => {
    if (loading || data.length > 0) {
      return "";
    }

    if (Object.values(errorData).length === 0 && data.length === 0) {
      return smallScreen
        ? message.emptyDataMessageMobile
        : message.emptyDataMessageDesk;
    }

    if (errorData.status === 0) {
      return message.errorTimeOutData;
    }

    return message.errorOtherData;
  }, [loading, data.length, errorData.status, smallScreen]);
};

export { useEmptyDataMessage };
