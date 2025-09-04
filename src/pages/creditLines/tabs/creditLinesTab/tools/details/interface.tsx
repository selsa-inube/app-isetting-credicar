import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { detailsCyclesLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsCyclesLabels";
import { IDetailsUI } from "@ptypes/creditLines/IDetailsUI";
import { StyledContainerIcon } from "./styles";

const DetailsUI = (props: IDetailsUI) => {
  const { showModal, screenTablet, onToggleModal } = props;

  return (
    <>
      <StyledContainerIcon onClick={onToggleModal}>
        <Icon
          appearance={EComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={"16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {detailsCyclesLabels.title}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && <></>}
    </>
  );
};

export { DetailsUI };
