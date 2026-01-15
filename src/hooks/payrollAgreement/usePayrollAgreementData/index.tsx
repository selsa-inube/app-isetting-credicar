import { useEffect, useState } from "react";
import { getPayrollAgreementData } from "@services/payrollAgreement/getPayrollAgreement";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { IUsePayrollAgreementData } from "@ptypes/hooks/IUsePayrollAgreementData";

const usePayrollAgreementData = (props: IUsePayrollAgreementData) => {
  const { businessUnits, token } = props;
  const [payrollAgreement, setPayrollAgreement] = useState<
    IPayrollAgreementData[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayrollAgreementData = async () => {
      setLoading(true);
      try {
        const data = await getPayrollAgreementData(businessUnits, token);
        setPayrollAgreement(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollAgreementData();
  }, []);

  return {
    payrollAgreement,
    hasError,
    loading,
  };
};

export { usePayrollAgreementData };
