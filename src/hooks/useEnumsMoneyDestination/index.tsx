import { useState, useEffect } from "react";

import { getEnumsMoneyDestination } from "@services/enums/getEnumsMoneyDestination";
import { getIcon } from "@utils/getIcon";
import { IEnumerators } from "@ptypes/IEnumerators";
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

  const enumDestination = enumData.map((data) => ({
    ...data,
    icon: getIcon(data.value),
  }));

  return { enumData, enumDestination, hasError };
};

export { useEnumsMoneyDestination };
