import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { detailsCyclesLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsCyclesLabels";
import { useDetailsCycle } from "@hooks/payrollAgreement/useDetailsCycle";
import { IDetailsCycles } from "@ptypes/design/IDetailsCycles";
import { portalId } from "@config/portalId";
import { DetailsCyclesModal } from "../../../detailsCyclesModal";

const DetailsCycles = (props: IDetailsCycles) => {
  const { data, detailsCycle } = props;

  const { showModal, handleToggleModal, handleCloseModal } = useDetailsCycle();

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
          data={data}
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
