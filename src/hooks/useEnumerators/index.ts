import { useState, useEffect } from "react";

import { getEnumerators } from "@services/getEnumerators";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseEnumerators } from "@ptypes/hooks/IUseEnumerators";

const useEnumerators = (props: IUseEnumerators) => {
  const { enumDestination, bussinesUnits } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumerators(enumDestination, bussinesUnits);
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

export { useEnumerators };
