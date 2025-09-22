import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useDetailsDestination } from "@hooks/moneyDestination/useDetailsDestination";
import { DetailsMoneyDestination } from "@design/feedback/detailsMoneyDestination";
import { IDetails } from "@ptypes/moneyDestination/tabs/IDetails";

const Details = (props: IDetails) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { showModal, handleToggleModal } = useDetailsDestination(appData, data);

  return (
    <>
      <DetailsMoneyDestination
        data={data}
        showModal={showModal}
        handleToggleModal={handleToggleModal}
      />
    </>
  );
};

export { Details };
