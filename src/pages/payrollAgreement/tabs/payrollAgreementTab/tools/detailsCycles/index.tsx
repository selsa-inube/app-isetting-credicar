import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { useDetailsCycle } from "@hooks/payrollAgreement/useDetailsCycle";
import { DetailsCyclesModal } from "@pages/payrollAgreement/tabs/detailsCyclesModal";
import { EComponentAppearance } from "@enum/appearances";
import { detailsCyclesLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsCyclesLabels";
import { IDetailsCycles } from "@ptypes/design/IDetailsCycles";
import { portalId } from "@config/portalId";

const DetailsCycles = (props: IDetailsCycles) => {
  const { data, detailsCycle } = props;

  const { showModal, normalizeData, handleToggleModal, handleCloseModal } =
    useDetailsCycle({ data });

  return (
    <>
      <Icon
        appearance={EComponentAppearance.DARK}
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        cursorHover
        spacing="narrow"
        onClick={handleToggleModal}
      />

      {showModal && (
        <DetailsCyclesModal
          data={normalizeData}
          labelsDetails={detailsCycle}
          actionText={detailsCyclesLabels.actionText}
          portalId={portalId}
          title={detailsCyclesLabels.title}
          onCloseModal={handleCloseModal}
          onClick={handleCloseModal}
        />
      )}
    </>
  );
};

export { DetailsCycles };
