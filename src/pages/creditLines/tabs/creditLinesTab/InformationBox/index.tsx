import { Icon, Text } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { IInformationBox } from "@ptypes/IInformationBox";

const InformationBox = (props: IInformationBox) => {
  const {
    description,
    boxPadding,
    boxColor,
    icon,
    sizeIcon,
    sizeDescription,
    appearanceIcon,
    widthBox = "100%",
  } = props;

  return (
    <BoxContainer
      width={widthBox}
      borderColor={EComponentAppearance.WARNING}
      borderRadius={tokens.spacing.s050}
      padding={boxPadding}
      backgroundColor={boxColor}
      boxSizing="initial"
      gap={tokens.spacing.s150}
    >
      <Icon
        appearance={appearanceIcon}
        icon={icon}
        cursorHover
        size={sizeIcon}
      />
      <Text type="label" size={sizeDescription} weight="bold">
        {description}
      </Text>
    </BoxContainer>
  );
};

export { InformationBox };
