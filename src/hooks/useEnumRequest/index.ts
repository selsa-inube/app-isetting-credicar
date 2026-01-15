import { useState, useEffect } from "react";

import { IEnumerators } from "@ptypes/IEnumerators";
import { getEnumeratorsRequest } from "@services/requestInProgress/getEnumerators";
import { IUseEnumRequest } from "@ptypes/hooks/IUseEnumRequest";

const useEnumRequest = (props: IUseEnumRequest) => {
  const { businessUnits, enumerator, token } = props;
  const [enumsRequests, setEnumsRequests] = useState<IEnumerators[]>([]);

  useEffect(() => {
    const fetchEnumsData = async () => {
      try {
        const data = await getEnumeratorsRequest(
          enumerator,
          businessUnits,
          token,
        );
        setEnumsRequests(data);
      } catch (error) {
        console.info(error);
      }
    };
    fetchEnumsData();
  }, []);

  return { enumsRequests };
};

export { useEnumRequest };
