import { useContext, useEffect, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { IUseValidateUseCase } from "@ptypes/hooks/IUseValidateUseCase";

const useValidateUseCase = (props: IUseValidateUseCase) => {
  const { useCase } = props;
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const { appData } = useContext(AuthAndPortalData);
  const useCasesData = appData.useCasesByStaff;
  useEffect(() => {
    if (useCasesData) {
      const validateUseCase = useCasesData.includes(useCase);
      setDisabledButton(!validateUseCase);
    }
  }, [useCasesData]);

  return {
    disabledButton,
  };
};

export { useValidateUseCase };
