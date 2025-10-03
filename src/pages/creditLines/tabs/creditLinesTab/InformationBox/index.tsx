import { Icon, IIconAppearance, Text } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
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
    onClickInfo,
    modalData = {} as IModalData,
    showModal,
  } = props;

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
        cursorHover
        size={sizeIcon}
        onClick={onClickInfo}
      />
      <Text
        type="label"
        size={sizeDescription}
        weight="bold"
        ellipsis={ellipsisText}
      >
        {description}
      </Text>

      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={descriptionModal || ""}
          onCloseModal={modalData.onCloseModal}
          appearance={
            modalData.appearance ||
            (EComponentAppearance.PRIMARY as IIconAppearance)
          }
          appearanceButton={
            modalData.appearanceButton ||
            (EComponentAppearance.PRIMARY as EComponentAppearance)
          }
        />
      )}
    </BoxContainer>
  );
};

export { InformationBox };
