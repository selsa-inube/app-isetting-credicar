import { useContext, useEffect, useState } from "react";
import { IOption } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getCitySubdivisionCountry } from "@services/shared/citySubdivisionCountry";
import { ICountrySubdivisionCity } from "@ptypes/hooks/ICountrySubdivisionCity";
import { IUseCitySubdivisionCountry } from "@ptypes/hooks/IUseCitySubdivisionCountry";

const useCitySubdivisionCountry = (props: IUseCitySubdivisionCountry) => {
  const { countryName } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [entries, setEntries] = useState<ICountrySubdivisionCity[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!countryName) {
        return;
      }
      try {
        const data = await getCitySubdivisionCountry(
          countryName,
          appData.token,
        );
        setEntries(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    fetchData();
  }, [countryName]);

  const optionsCitySubdivision: IOption[] = entries.map(
    (entry, index: number) => {
      return {
        id: `${index}-${entry.cityName} `,
        label: `${entry.cityName}, ${entry.subdivisionCountry}, ${entry.countryName}`,
        value: `${entry.cityName}, ${entry.subdivisionCountry}, ${entry.countryName}`,
      };
    },
  );

  return { optionsCitySubdivision, hasError };
};

export { useCitySubdivisionCountry };
