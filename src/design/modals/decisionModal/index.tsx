import {
  Date,
  Divider,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { mediaQueryMobile } from "@config/environment";
import { tokens } from "@design/tokens";
import { IDecisionModal } from "@ptypes/design/IDecisionModal";
import { ModalWrapper } from "../modalWrapper";

const DecisionModal = (props: IDecisionModal) => {
  const {
    actionText,
    icon = <></>,
    withIcon = false,
    description,
    loading = false,
    sizeIcon = "60px",
    portalId = "portal",
    title,
    appearance = EComponentAppearance.PRIMARY,
    appearanceButton = EComponentAppearance.PRIMARY,
    withCancelButton = true,
    moreDetails,
    withDate,
    onDateChange,
    statusDate,
    valueDate,
    messageDate,
    isDisabledButton = false,
    changeZIndex,
    subtitle,
    onBlurDate,
    onClick,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <ModalWrapper
      portalId={portalId}
      width={isMobile ? "335px" : "450px"}
      isMobile={isMobile}
      labelActionButton={actionText}
      labelCloseButton="Cancelar"
      labelCloseModal="Cerrar"
      title={title}
      withCancelButton={withCancelButton}
      onCloseModal={onCloseModal}
      onClick={onClick ?? (() => void 0)}
      loading={loading}
      disabledActionButton={isDisabledButton}
      appearanceButton={appearanceButton}
      changeZIndex={changeZIndex}
    >
      {withIcon && (
        <Stack width="100%" alignItems="center" justifyContent="center">
          <Icon icon={icon} appearance={appearance} size={sizeIcon} />
        </Stack>
      )}
      {subtitle && (
        <Text appearance={EComponentAppearance.DARK} size="large">
          {subtitle}
        </Text>
      )}

      <Text
        appearance={
          moreDetails ? EComponentAppearance.GRAY : EComponentAppearance.DARK
        }
        type="body"
        size="medium"
      >
        {description}
      </Text>

      {withDate && (
        <Date
          id="date"
          name="date"
          onChange={onDateChange}
          status={statusDate}
          value={valueDate}
          size="compact"
          message={messageDate}
          fullwidth
          onBlur={onBlurDate}
        />
      )}

      {moreDetails && (
        <Stack direction="column" gap={tokens.spacing.s200}>
          <Divider dashed />
          <Text size="medium" appearance={EComponentAppearance.DARK}>
            {moreDetails}
          </Text>
        </Stack>
      )}
    </ModalWrapper>
  );
};

export { DecisionModal };
