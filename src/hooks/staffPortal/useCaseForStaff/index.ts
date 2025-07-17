import { useState, useEffect } from "react";

import { getUseCaseForStaff } from "@services/staffPortal/getUseCaseForStaff";
import { IUseCaseForStaff } from "@ptypes/hooks/IUseCaseForStaff";

const useCaseForStaff = (props: IUseCaseForStaff) => {
  const {
    businessUnitPrevious,
    useCasesByStaff,
    businessUnit,
    userAccount,
    businessManagerCode,
  } = props;
  const [useCases, setUseCases] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchUseCasesData = async () => {
      setLoading(true);

      const businessUnitSigla = JSON.parse(businessUnit ?? "{}");

      const isDifferentBusinessUnit =
        businessUnitPrevious !== businessUnitSigla.publicCode;
      const shouldValidateChange =
        isDifferentBusinessUnit || useCasesByStaff.length === 0;

      try {
        if (shouldValidateChange && businessManagerCode) {
          if (businessManagerCode) {
            const data = await getUseCaseForStaff(
              businessUnitSigla.publicCode,
              userAccount,
              businessManagerCode,
            );
            setUseCases(data);
          }
        }
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUseCasesData();
  }, [businessUnit, businessManagerCode]);

  return {
    useCases,
    loading,
    hasError,
  };
};

export { useCaseForStaff };
