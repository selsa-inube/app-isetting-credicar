import { useState, useEffect } from "react";
import { getEnumeratorsIsaas } from "@services/enums/getEnumeratorsIsaas";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IUseEnumeratorsIsaas } from "@ptypes/hooks/IUseEnumeratorsIsaas";

const useEnumeratorsIsaas = (props: IUseEnumeratorsIsaas) => {
  const { enumIsaas } = props;
  const [enumData, setEnumData] = useState<IEnumerators[]>(
    [] as IEnumerators[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEnumData = async () => {
      try {
        const data = await getEnumeratorsIsaas(
          enumIsaas,
          EPayrollAgreement.COUNTRY_IDENTIFICATION,
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

export { useEnumeratorsIsaas };
