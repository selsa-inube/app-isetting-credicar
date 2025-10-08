import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";
import { useDetailsCreditLine } from "@hooks/creditLine/useDetailsCreditLine";
import { EComponentAppearance } from "@enum/appearances";
import { detailsLabels } from "@config/detailsLabels";
import { IDetailsConfiguration } from "@ptypes/creditLines/IDetailsConstruction";
import { StyledContainerIcon } from "./styles";

const Details = (props: IDetailsConfiguration) => {
  const { data } = props;

  const { handleConfiguration, screenTablet } = useDetailsCreditLine({
    data,
  });

  return (
    <>
      <StyledContainerIcon
        onClick={handleConfiguration}
        $isTablet={screenTablet}
      >
        <Icon
          appearance={EComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {detailsLabels.title}
          </Text>
        )}
      </StyledContainerIcon>
    </>
  );
};

export { Details };
