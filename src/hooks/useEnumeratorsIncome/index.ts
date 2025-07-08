import { useState, useEffect } from "react";

import { IEnumerators } from "@ptypes/IEnumerators";
import { getEnumeratorsIncome } from "@services/enums/getEnumeratorsIncome";
import { IUseEnumeratorsIncome } from "@ptypes/hooks/IUseEnumeratorsIncome";

const useEnumeratorsIncome = (props: IUseEnumeratorsIncome) => {
  const { bussinesUnits } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumeratorsIncome(bussinesUnits);
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

export { useEnumeratorsIncome };
