import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  ITextSize,
  Text,
  Icon,
  useMediaQuery,
} from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { tokens } from "@design/tokens";
import { StyledContainerText } from "./styles";

interface ITitle {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  navigatePage?: string;
  sizeTitle?: ITextSize;
  onClick?: () => void;
}

const Title = (props: ITitle) => {
  const {
    title,
    sizeTitle = "medium",
    description,
    icon,
    navigatePage,
    onClick,
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
              {title}
            </Text>
          </StyledContainerText>
        </Stack>
        <Text appearance="gray" size={smallScreen ? "small" : "medium"}>
          {description}
        </Text>
      </Stack>
    </>
  );
};

export { Title };
export type { ITitle };
