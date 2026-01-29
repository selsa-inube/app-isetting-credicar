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
    heigthBox = "100%",
    ellipsisText = false,
    descriptionModal,
    withCursor = true,
    onClickInfo,
  } = props;

  const handleClick = () => {
    if (onClickInfo) {
      onClickInfo(descriptionModal);
    }
  };

  return (
    <BoxContainer
      width={widthBox}
      height={heigthBox}
      borderColor={EComponentAppearance.WARNING}
      borderRadius={tokens.spacing.s050}
      padding={boxPadding}
      backgroundColor={boxColor}
      boxSizing="border-box"
      gap={tokens.spacing.s150}
    >
      <Icon
        appearance={appearanceIcon}
        icon={icon}
        cursorHover={withCursor}
        size={sizeIcon}
        onClick={handleClick}
      />
      <Text
        type="label"
        size={sizeDescription}
        weight="bold"
        ellipsis={ellipsisText}
      >
        {description}
      </Text>
    </BoxContainer>
  );
};

export { InformationBox };
