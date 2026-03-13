import { MdArrowBack, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Text,
  Icon,
  useMediaQuery,
  SkeletonLine,
  SkeletonIcon,
} from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { mediaQueryMobile } from "@config/environment";
import { tokens } from "@design/tokens";
import { ITitleOfDecisions } from "@ptypes/design/ITitleOfDecisions";
import { StyledContainerText } from "./styles";

const TitleOfDecisions = (props: ITitleOfDecisions) => {
  const {
    title,
    loading,
    sizeTitle = "medium",
    description,
    icon,
    navigatePage,
    lineName = "",
    lineType = "",
    onClick,
    onToggleInfoModal,
  } = props;

  const smallScreen = useMediaQuery(mediaQueryMobile);

  const navigate = useNavigate();

  const onGoBack = () => {
    if (onClick) {
      onClick();
    } else {
      if (navigatePage) {
        navigate(navigatePage);
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <>
      <Stack gap={tokens.spacing.s100} direction="column">
        <Stack gap={tokens.spacing.s100} alignItems="center">
          {loading ? (
            <Stack width="100%" gap={tokens.spacing.s100}>
              <SkeletonIcon animated />
              <SkeletonLine animated width="500px" height="24px" />
              <SkeletonIcon animated />
            </Stack>
          ) : (
            <Stack direction="column" gap={tokens.spacing.s050}>
              <Stack gap={tokens.spacing.s050} alignItems="center">
                {icon ? (
                  <Icon
                    appearance="dark"
                    cursorHover={true}
                    icon={icon}
                    spacing="narrow"
                    size="20px"
                  />
                ) : (
                  <Icon
                    appearance="dark"
                    cursorHover={true}
                    icon={<MdArrowBack />}
                    spacing="narrow"
                    size="20px"
                    onClick={onGoBack}
                  />
                )}

                <StyledContainerText>
                  <Text
                    type="title"
                    size={smallScreen ? "small" : `${sizeTitle}`}
                    weight="bold"
                  >
                    {`${title} ${lineName}, ${lineType}`}
                  </Text>
                  <Icon
                    icon={<MdInfo />}
                    appearance={EComponentAppearance.HELP}
                    onClick={onToggleInfoModal}
                    size="24px"
                    cursorHover
                  />
                </StyledContainerText>
              </Stack>
              <Text appearance="gray" size={smallScreen ? "small" : "medium"}>
                {description}
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export { TitleOfDecisions };
