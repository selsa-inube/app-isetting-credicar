import { useState, useEffect } from "react";

import { getEnumsCrediboard } from "@services/enums/getEnumsCrediboard";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseEnumeratorsCrediboard } from "@ptypes/hooks/IUseEnumeratorsCrediboard";

const useEnumeratorsCrediboard = (props: IUseEnumeratorsCrediboard) => {
  const { businessUnits, enumQuery } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumsCrediboard(businessUnits, enumQuery);
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

export { useEnumeratorsCrediboard };
