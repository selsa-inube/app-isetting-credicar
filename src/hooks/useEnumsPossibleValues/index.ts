import { useState, useEffect } from "react";

import { IEnumerators } from "@ptypes/IEnumerators";
import { getListPossibleValues } from "@services/enums/getListPossibleValues";
import { IUseEnumsPossibleValues } from "@ptypes/hooks/IUseEnumsPossibleValues";

const useEnumsPossibleValues = (props: IUseEnumsPossibleValues) => {
  const { businessUnit } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [valuesData, setValuesData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const data = await getListPossibleValues(businessUnit);
        setValuesData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEnumData();
  }, []);

  return { valuesData, loading, hasError };
};

export { useEnumsPossibleValues };
