import { useState, useEffect, useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getLineOfCreditData } from "@services/moneyDestination/getLineOfCredit";
import { ICreditLineData } from "@ptypes/moneyDestination/tabs/ICreditLineData";
import { IServerDomain } from "@ptypes/IServerDomain";

const useCreditLine = () => {
  const { appData } = useContext(AuthAndPortalData);
  const [creditLineData, setCreditLineData] = useState<ICreditLineData[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchCreditLineData = async () => {
      try {
        const data = await getLineOfCreditData(appData.businessUnit.publicCode);
        setCreditLineData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    fetchCreditLineData();
  }, []);

  const optionsCreditLine: IServerDomain[] = creditLineData.map((item) => {
    return {
      id: item.abbreviatedName,
      label: item.alias,
      value: item.abbreviatedName,
    };
  });

  return { optionsCreditLine, creditLineData, hasError };
};

export { useCreditLine };
