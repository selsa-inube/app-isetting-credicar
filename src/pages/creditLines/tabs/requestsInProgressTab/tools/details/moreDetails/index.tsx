import { useDetailsRequest } from "@hooks/creditLine/useDetailsRequest";
import { DecisionModal } from "@design/modals/decisionModal";
import { portalId } from "@config/portalId";
import { IMoreDetails } from "@ptypes/creditLines/IMoreDetails";

const MoreDetails = (props: IMoreDetails) => {
  const { data, useNameRequest } = props;

  const { modalData, showModal } = useDetailsRequest({
    configurationData: data,
    useNameRequest,
  });

  return (
    <>
      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
        />
      )}
    </>
  );
};

export { MoreDetails };
