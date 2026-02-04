import { useState, useEffect } from "react";

import { getEnumerators } from "@services/enums/getEnumerators";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseEnumerators } from "@ptypes/hooks/IUseEnumerators";

const useEnumerators = (props: IUseEnumerators) => {
  const { enumDestination, businessUnits, token } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const data = await getEnumerators(
          enumDestination,
          businessUnits,
          token,
        );
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

  return { enumData, hasError, loading };
};

export { useEnumerators };
