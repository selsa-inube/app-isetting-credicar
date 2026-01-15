import { useState, useEffect, useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getCitiesData } from "@services/shared/cities";
import { ICity } from "@ptypes/ICity";
import { IServerDomain } from "@ptypes/IServerDomain";

const useCities = () => {
  const [citiesData, setCitiesData] = useState<ICity[]>([] as ICity[]);
  const [hasError, setHasError] = useState(false);
  const { appData } = useContext(AuthAndPortalData);

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const data = await getCitiesData(appData.token);

        setCitiesData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    fetchCitiesData();
  }, []);

  const optionsCities: IServerDomain[] = citiesData.map((item) => {
    return {
      id: item.cityCatalogId,
      label: item.descriptionUse,
      value: item.publicCode,
    };
  });

  return { optionsCities, hasError };
};

export { useCities };
