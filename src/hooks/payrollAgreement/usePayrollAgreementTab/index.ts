import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { getPayrollAgreementData } from "@services/payrollAgreement/getPayrollAgreement";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { IUsePayrollAgreementTab } from "@ptypes/hooks/payrollAgreement/IUsePayrollAgreementTab";

const usePayrollAgreementTab = (props: IUsePayrollAgreementTab) => {
  const { bussinesUnits } = props;
  const [payrollAgreement, setPayrollAgreement] = useState<
    IPayrollAgreementData[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [searchPayrollAgreement, setSearchPayrollAgreement] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");

  useEffect(() => {
    const fetchPayrollAgreementData = async () => {
      setLoading(true);
      try {
        const data = await getPayrollAgreementData(bussinesUnits);
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

  useEffect(() => {
    if (entryDeleted) {
      setPayrollAgreement((prev) =>
        prev.filter((entry) => entry.id !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const handleSearchPayrollAgreement = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchPayrollAgreement(e.target.value);
  };

  const smallScreen = useMediaQuery("(max-width: 690px)");
  const columnWidths = smallScreen ? [20, 53] : [20, 60];

  return {
    payrollAgreement,
    searchPayrollAgreement,
    loading,
    hasError,
    smallScreen,
    columnWidths,
    setEntryDeleted,
    handleSearchPayrollAgreement,
  };
};

export { usePayrollAgreementTab };
