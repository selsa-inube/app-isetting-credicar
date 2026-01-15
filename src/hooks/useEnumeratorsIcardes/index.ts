import { useState, useEffect } from "react";

import { IEnumerators } from "@ptypes/IEnumerators";
import { getEnumeratorsIcardes } from "@services/enums/getEnumeratorsIcardes";
import { IUseEnumeratorsICardes } from "@ptypes/hooks/IUseEnumeratorsIcardes";

const useEnumeratorsICardes = (props: IUseEnumeratorsICardes) => {
  const { enumCredicar, businessUnits, token } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumeratorsIcardes(
          enumCredicar,
          businessUnits,
          token,
        );
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

export { useEnumeratorsICardes };
