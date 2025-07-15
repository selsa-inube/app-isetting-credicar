import { useState, useEffect } from "react";

import { getEnumerators } from "@services/enums/getEnumerators";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseEnumerators } from "@ptypes/hooks/IUseEnumerators";

const useEnumerators = (props: IUseEnumerators) => {
  const { enumDestination, businessUnits } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumerators(enumDestination, businessUnits);
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
