import { Text, Grid, useMediaQueries } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { StyledRadioBusinessUnit, StyledRadio, StyledImage } from "./styles";

interface IRadioBusinessUnit {
  id: string;
  label: string;
  logo: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioBusinessUnit = (props: IRadioBusinessUnit) => {
  const { name, id, value, label, logo, handleChange } = props;

  const mediaQueries = ["(max-width: 532px)", "(max-width: 460px)"];
  const matches = useMediaQueries(mediaQueries);
  return (
    <StyledRadioBusinessUnit $isTablet={matches["(max-width: 532px)"]}>
      <Grid
        templateColumns={
          matches["(max-width: 532px)"] ? "auto 1fr" : "auto 1fr 130px"
        }
        padding={
          matches["(max-width: 532px)"]
            ? `${tokens.spacing.s100} ${tokens.spacing.s200}`
            : `${tokens.spacing.s200} ${tokens.spacing.s250}`
        }
        height={matches["(max-width: 532px)"] ? "auto" : "72px"}
        alignItems="center"
        alignContent="center"
        gap={tokens.spacing.s200}
        width="100%"
      >
        <StyledRadio
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
        />
        <Text size="medium">{label}</Text>
        <StyledImage
          $isTablet={matches["(max-width: 532px)"]}
          src={logo}
          alt="Logo de empresa"
        />
      </Grid>
    </StyledRadioBusinessUnit>
  );
};

export { RadioBusinessUnit };
export type { IRadioBusinessUnit };
