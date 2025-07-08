import { useState, useEffect } from "react";

import { IEnumerators } from "@ptypes/IEnumerators";
import { getEnumeratorsIcardes } from "@services/enums/getEnumeratorsIcardes";
import { IUseEnumeratorsIcardes } from "@ptypes/hooks/IUseEnumeratorsIcardes";

const useEnumeratorsIcardes = (props: IUseEnumeratorsIcardes) => {
  const { enumCredicar, bussinesUnits } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumeratorsIcardes(enumCredicar, bussinesUnits);
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

export { useEnumeratorsIcardes };
