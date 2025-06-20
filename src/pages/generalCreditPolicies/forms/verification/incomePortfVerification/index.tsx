import { Grid, inube } from "@inubekit/inubekit";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { columnsAttribute } from "@utils/columnsAttribute";
import { rowsAttribute } from "@utils/rowsAttribute";
import { IEntry } from "@ptypes/design/table/IEntry";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { IRenderContributionsVerification } from "@ptypes/generalCredPolicies/forms/IRenderContributionsVerification";

const RenderIncomeVerification = (props: IRenderContributionsVerification) => {
  const { values, isMobile } = props;
  const theme = useThemeData();

  return (
    <BoxContainer
      direction="column"
      borderRadius={tokens.spacing.s100}
      width="100%"
      backgroundColor={theme?.palette?.neutral?.N0 ?? inube.palette.neutral.N0}
      boxSizing="initial"
    >
      {values && (
        <Grid
          key={1}
          width="100%"
          height="auto"
          templateColumns={columnsAttribute(values as IEntry[], isMobile)}
          templateRows={rowsAttribute(values as IEntry[], isMobile)}
          gap={tokens.spacing.s200}
        >
          {values.map((item) => (
            <BoxAttribute
              key={item.businessRuleId}
              direction="column"
              label={item.decisionId ?? ""}
              value={`${item.labelName}: ${String(item.value ?? "")}`}
            />
          ))}
        </Grid>
      )}
    </BoxContainer>
  );
};

export { RenderIncomeVerification };
