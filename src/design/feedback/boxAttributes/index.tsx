import { Stack, Text, Grid, useMediaQuery } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { IBoxAttribute } from "@ptypes/design/IBoxAttribute";
import { BoxContainer } from "@design/layout/boxContainer";
import { ButtonAttribute } from "./ButtonAttribute";
import { ContainerAttribute } from "./containerAttribute";
import { mediaQueryTablet } from "@config/environment";

const BoxAttribute = (props: IBoxAttribute) => {
  const {
    label,
    value,
    withButton,
    buttonIcon,
    buttonValue,
    direction,
    onClickButton,
    withTag,
    children,
  } = props;

  const isMobile = useMediaQuery(mediaQueryTablet);

  return (
    <BoxContainer
      alignItems="center"
      borderRadius={tokens.spacing.s100}
      padding={
        isMobile
          ? tokens.spacing.s100
          : `${tokens.spacing.s075} ${tokens.spacing.s200}`
      }
      boxSizing="border-box"
      backgroundColor={EComponentAppearance.GRAY}
    >
      <Grid
        templateColumns={direction === "column" ? "1fr" : "auto 1fr"}
        templateRows="auto auto"
        width="100%"
        gap={tokens.spacing.s050}
        alignItems="center"
        justifyContent="space-between"
        height="auto"
      >
        <Text
          type="label"
          size={isMobile ? "small" : "medium"}
          appearance={EComponentAppearance.DARK}
          weight="bold"
        >
          {label}
        </Text>

        <Stack
          alignItems="center"
          justifyContent={direction === "column" ? "flex-start" : "flex-end"}
        >
          {withButton ? (
            <ButtonAttribute
              icon={buttonIcon}
              value={buttonValue}
              onClick={onClickButton}
            />
          ) : (
            <>
              <ContainerAttribute
                withTag={withTag ?? false}
                isMobile={isMobile}
                direction={direction}
                value={value}
              >
                {children}
              </ContainerAttribute>
            </>
          )}
        </Stack>
      </Grid>
    </BoxContainer>
  );
};

export { BoxAttribute };
