import { Stack, Text, useMediaQueries, Button, Tag } from "@inubekit/inubekit";

import inubeLogo from "@assets/images/logo-inube.png";
import errorImage from "@assets/images/errorPage.png";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { errorCodes } from "@config/errorCodes";
import {
  StyledCompanyLogo,
  StyledContainer,
  StyledDividerContainer,
  StyledErrorImage,
  StyledItem,
  StyledList,
  StyledTextErrorContainer,
} from "./styles";
import { errorPageLabels } from "@config/errorPageLabels";
import { IErrorPage } from "@ptypes/design/IErrorPage";

const ErrorPage = (props: IErrorPage) => {
  const {
    errorCode = 0,
    heading = "¡Ups! Algo salió mal...",
    nameButton = "Regresar",
    onClick,
  } = props;

  const mediaQueries = [
    "(min-width: 771px)",
    "(max-width: 770px)",
    "(max-width: 1000px)",
  ];
  const matches = useMediaQueries(mediaQueries);

  const DetailsErrors = errorCodes[errorCode] ?? {
    descriptionError: ["No se proporcionó información sobre el error."],
    solutionError: ["Intenta nuevamente más tarde."],
  };

  return (
    <StyledContainer $isTablet={matches["(max-width: 1000px)"]}>
      <Stack direction="column" gap={tokens.spacing.s500} height="100%">
        <Stack justifyContent="left" alignItems="start">
          <StyledCompanyLogo
            src={inubeLogo}
            alt={"logo"}
            $isTablet={matches["(max-width: 1000px)"]}
          />
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          height="100px"
          width="100%"
          direction="column"
          gap={tokens.spacing.s150}
        >
          <Text
            type="headline"
            weight="bold"
            size={matches["(max-width: 770px)"] ? "medium" : "large"}
            appearance={EComponentAppearance.DARK}
          >
            {heading}
          </Text>
          <Tag
            appearance={EComponentAppearance.GRAY}
            label={`Código de error: ${errorCode}`}
            displayIcon={false}
          />
        </Stack>
        <StyledErrorImage
          $isTablet={matches["(max-width: 770pxpx)"]}
          src={errorImage}
          alt="error"
        />
        <StyledTextErrorContainer $isTablet={matches["(max-width: 770px)"]}>
          <Stack direction="column" gap={tokens.spacing.s150} width="100%">
            <Text
              type="title"
              size="large"
              weight="bold"
              appearance={EComponentAppearance.DARK}
            >
              {errorPageLabels.whatWentWrong}
            </Text>
            <StyledList>
              {DetailsErrors.descriptionError.map((item, index) => (
                <StyledItem key={index}>
                  <Text
                    type="title"
                    size="small"
                    appearance={EComponentAppearance.GRAY}
                  >
                    {item}
                  </Text>
                </StyledItem>
              ))}
            </StyledList>
          </Stack>

          <StyledDividerContainer $isTablet={matches["(max-width: 1000px)"]} />

          <Stack direction="column" gap={tokens.spacing.s150} width="100%">
            <Text
              type="title"
              size="large"
              weight="bold"
              appearance={EComponentAppearance.DARK}
            >
              {errorPageLabels.howToFixIt}
            </Text>
            <StyledList>
              {DetailsErrors.solutionError.map((item, index) => (
                <StyledItem key={index}>
                  <Text
                    type="title"
                    size="small"
                    appearance={EComponentAppearance.GRAY}
                  >
                    {item}
                  </Text>
                </StyledItem>
              ))}
            </StyledList>
            <Stack alignContent="center" justifyContent="center">
              <Button
                appearance={EComponentAppearance.PRIMARY}
                onClick={onClick}
              >
                {nameButton}
              </Button>
            </Stack>
          </Stack>
        </StyledTextErrorContainer>
        <Text
          appearance={EComponentAppearance.GRAY}
          textAlign="center"
          size="small"
          weight="bold"
        >
          {errorPageLabels.inube}
        </Text>
      </Stack>
    </StyledContainer>
  );
};

export { ErrorPage };
export type { IErrorPage };
