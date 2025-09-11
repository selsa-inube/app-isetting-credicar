import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useModalDeleteCreditLine } from "@hooks/creditLine/delete/useModalDelete";
import { useDeleteCreditLine } from "@hooks/creditLine/delete/useDeleteCreditLine";
import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { IDelete } from "@ptypes/hooks/creditLines/IDelete";

const Delete = (props: IDelete) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);

  const {
    showModal,
    showInfoModal,
    handleToggleInfoModal,
    handleToggleModal,
    handleClick,
  } = useDeleteCreditLine({ data, appData });

  const { modalData, showDecision } = useModalDeleteCreditLine({
    loading: false,
    showInfoModal,
    showModal,
    handleToggleInfoModal,
    handleClick,
    handleToggleModal,
  });

  return (
    <>
      <DeleteRecord
        modalData={modalData}
        showDecision={showDecision}
        onToggleModal={handleToggleModal}
        loading={false}
      />
    </>
  );
};

export { Delete };
