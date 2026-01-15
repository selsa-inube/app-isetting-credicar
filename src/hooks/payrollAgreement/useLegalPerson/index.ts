import { useState, useEffect } from "react";

import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";
import { getLegalPersonsData } from "@services/payrollAgreement/getLegalPersons";
import { IUseLegalPerson } from "@ptypes/hooks/IUseLegalPerson";

const useLegalPerson = (props: IUseLegalPerson) => {
  const { businessUnits, token } = props;
  const [legalPersonData, setLegalPersonData] = useState<ILegalPerson[]>(
    [] as ILegalPerson[],
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLegalPersonData = async () => {
      try {
        const data = await getLegalPersonsData(businessUnits, token);

        setLegalPersonData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    fetchLegalPersonData();
  }, []);

  const legalPersonOptions = legalPersonData.map((item) => ({
    id: item.payingEntityName,
    label: item.payingEntityName,
    value: item.payingEntityName,
  }));

  legalPersonOptions.unshift({
    id: "addCompany",
    label: "(+) Agregar otra empresa",
    value: "addCompany",
  });

  return { legalPersonData, legalPersonOptions, hasError };
};

export { useLegalPerson };
