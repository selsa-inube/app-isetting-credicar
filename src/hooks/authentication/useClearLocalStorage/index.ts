import { useEffect } from "react";

const useClearLocalStorage = () => {
  useEffect(() => {
    const keysToRemove = [
      "businessUnitSigla",
      "businessUnitsToTheStaff",
      "useCasesByStaff",
      "portalCode",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }, []);
};

export { useClearLocalStorage };
