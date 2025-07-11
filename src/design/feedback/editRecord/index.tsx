import { MdOutlineCreate } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { editLabels } from "@config/editLabels";
import { IEditRecord } from "@ptypes/design/IEditRecord";
import { StyledContainerIcon } from "./styles";

const EditRecord = (props: IEditRecord) => {
  const { onEdit } = props;

  const screenTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <StyledContainerIcon onClick={onEdit} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.PRIMARY}
          icon={<MdOutlineCreate />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {editLabels.title}
          </Text>
        )}
      </StyledContainerIcon>
    </>
  );
};

export { EditRecord };
