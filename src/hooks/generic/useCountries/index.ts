import { useState, useEffect, useContext } from "react";

import { ICountry } from "@ptypes/ICountry";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getCountriesData } from "@services/shared/countries";
import { IServerDomain } from "@ptypes/IServerDomain";

const useCountries = () => {
  const { appData } = useContext(AuthAndPortalData);
  const [countriesData, setCountriesData] = useState<ICountry[]>(
    [] as ICountry[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const data = await getCountriesData(appData.token);

        setCountriesData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    fetchCountriesData();
  }, []);

  const optionsCountries: IServerDomain[] = countriesData.map((item) => {
    return {
      id: item.countryCatalogId,
      label: item.abbreviatedName,
      value: item.abbreviatedName,
    };
  });

  return { optionsCountries, hasError };
};

export { useCountries };
