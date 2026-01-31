import { useEffect } from "react";

const useClearLocalStorage = () => {
  useEffect(() => {
    const keysToRemove = [
      "businessUnitSigla",
      "businessUnitsToTheStaff",
      "useCasesByStaff",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }, []);
};

export { useClearLocalStorage };
