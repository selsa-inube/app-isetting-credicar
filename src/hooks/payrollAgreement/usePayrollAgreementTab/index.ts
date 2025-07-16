import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { getPayrollAgreementData } from "@services/payrollAgreement/getPayrollAgreement";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { IUsePayrollAgreementTab } from "@ptypes/hooks/payrollAgreement/IUsePayrollAgreementTab";
import { payrollTabLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/payrollTabLabels";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { useValidateUseCase } from "@hooks/useValidateUseCase";

const usePayrollAgreementTab = (props: IUsePayrollAgreementTab) => {
  const { businessUnits } = props;
  const [payrollAgreement, setPayrollAgreement] = useState<
    IPayrollAgreementData[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [searchPayrollAgreement, setSearchPayrollAgreement] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { disabledButton } = useValidateUseCase({
    useCase: EPayrollAgreement.USE_CASE_ADD,
  });

  useEffect(() => {
    const fetchPayrollAgreementData = async () => {
      setLoading(true);
      try {
        const data = await getPayrollAgreementData(businessUnits);
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

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const handleSearchPayrollAgreement = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchPayrollAgreement(e.target.value);
  };

  const smallScreen = useMediaQuery("(max-width: 690px)");
  const columnWidths = smallScreen ? [20, 53] : [20, 60];

  const emptyDataMessage = smallScreen
    ? payrollTabLabels.emptyDataMessageMobile
    : payrollTabLabels.emptyDataMessageDesk;

  return {
    payrollAgreement,
    searchPayrollAgreement,
    loading,
    hasError,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    showInfoModal,
    handleToggleInfoModal,
    setEntryDeleted,
    handleSearchPayrollAgreement,
  };
};

export { usePayrollAgreementTab };
