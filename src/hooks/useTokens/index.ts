import { useState, useEffect } from "react";
import { getTokens } from "@services/tokens";
import { IThemeData } from "@ptypes/ITokens";

const useToken = (businessUnits: string) => {
  const [hasError, setHasError] = useState(false);
  const [token, setToken] = useState<IThemeData>({} as IThemeData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokensData = async () => {
      setLoading(true);
      try {
        const data = await getTokens(businessUnits);
        setToken(data[0].themeData);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTokensData();
  }, []);

  return {
    token,
    hasError,
    loading,
  };
};

export { useToken };
