import { useState, useEffect } from "react";

import { IEnumerators } from "@ptypes/IEnumerators";
import { getEnumsMoneyDestination } from "@services/enums/getEnumsMoneyDestination";
import { IUseEnumsMoneyDestination } from "@ptypes/hooks/IUseEnumsMoneyDestination";

const useEnumsMoneyDestination = (props: IUseEnumsMoneyDestination) => {
  const { businessUnits } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumsMoneyDestination(businessUnits);
        setEnumData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };
    fetchEnumData();
  }, []);

  return { enumData, hasError };
};

export { useEnumsMoneyDestination };
