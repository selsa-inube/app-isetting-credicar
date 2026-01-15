import { useState, useEffect } from "react";

import { getEnumsCrediboard } from "@services/enums/getEnumsCrediboard";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseEnumeratorsCrediboard } from "@ptypes/hooks/IUseEnumeratorsCrediboard";

const useEnumeratorsCrediboard = (props: IUseEnumeratorsCrediboard) => {
  const { businessUnits, enumQuery, token } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const data = await getEnumsCrediboard(businessUnits, enumQuery, token);
        setEnumData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEnumData();
  }, []);

  return { enumData, loading, hasError };
};

export { useEnumeratorsCrediboard };
