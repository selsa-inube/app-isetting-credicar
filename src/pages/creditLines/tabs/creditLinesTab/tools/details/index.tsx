import { useDetailsCreditLine } from "@hooks/creditLine/useDetailsCreditLine";
import { IDetails } from "@ptypes/payrollAgreement/payrollAgreementTab/IDetails";
import { DetailsUI } from "./interface";

const Details = (props: IDetails) => {
  const { data } = props;

  const { showModal, screenTablet, handleToggleModal } = useDetailsCreditLine({
    data,
  });

  return (
    <DetailsUI
      showModal={showModal}
      onToggleModal={handleToggleModal}
      screenTablet={screenTablet}
    />
  );
};

export { Details };
