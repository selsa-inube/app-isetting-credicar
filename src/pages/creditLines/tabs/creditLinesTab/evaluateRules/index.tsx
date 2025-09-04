import { MdOutlineReportProblem } from "react-icons/md";
import { Grid, Icon, Stack, Text } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { columnsAttribute } from "@utils/columnsAttribute";
import { rowsAttribute } from "@utils/rowsAttribute";
import { EComponentAppearance } from "@enum/appearances";
import { IEvaluateRules } from "@ptypes/IEvaluateRules";
import { InformationBox } from "../InformationBox";

const EvaluateRules = (props: IEvaluateRules) => {
  const { title, subtitle, missingRules } = props;
  return (
    <BoxContainer
      direction="column"
      width="auto"
      borderColor={EComponentAppearance.DARK}
      borderRadius={tokens.spacing.s050}
      padding={tokens.spacing.s250}
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="border-box"
      gap={tokens.spacing.s250}
    >
      <Stack direction="column" alignItems="center" gap={tokens.spacing.s250}>
        <Icon
          appearance={EComponentAppearance.WARNING}
          icon={<MdOutlineReportProblem />}
          cursorHover
          size="36px"
        />
        <Stack width="500px" alignContent="center" justifyContent="center">
          <Text type="title" size="medium" weight="bold" textAlign="center">
            {title}
          </Text>
        </Stack>
        <Text size="medium" appearance={EComponentAppearance.GRAY}>
          {subtitle}
        </Text>
      </Stack>
      <Grid
        templateColumns={columnsAttribute(missingRules)}
        templateRows={rowsAttribute(missingRules)}
        gap={tokens.spacing.s200}
        width="auto"
      >
        {missingRules.map((rule: string, index: number) => (
          <InformationBox
            key={index}
            widthBox="auto"
            icon={<MdOutlineReportProblem />}
            appearanceIcon={EComponentAppearance.WARNING}
            description={rule}
            boxPadding={tokens.spacing.s200}
            boxColor={EComponentAppearance.WARNING}
            sizeIcon="16px"
            sizeDescription="medium"
          />
        ))}
      </Grid>
    </BoxContainer>
  );
};

export { EvaluateRules };
