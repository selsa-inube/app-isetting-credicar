import { Grid } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { columnsAttribute } from "@utils/columnsAttribute";
import { rowsAttribute } from "@utils/rowsAttribute";
import { IEntry } from "@ptypes/design/table/IEntry";
import { BoxContainer } from "@design/layout/boxContainer";
import { hasValues } from "@utils/hasValues";
import { IRenderRegularVerification } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IRenderRegularVerification";
import { EComponentAppearance } from "@enum/appearances";

const RenderRegularVerification = (props: IRenderRegularVerification) => {
  const { values, isMobile } = props;

  return (
    <BoxContainer
      direction="column"
      borderRadius={tokens.spacing.s100}
      width="100%"
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="initial"
    >
      {hasValues(values) && (
        <Grid
          key={values[0].id}
          width="100%"
          templateColumns={columnsAttribute(values as IEntry[], isMobile)}
          templateRows={rowsAttribute(values as IEntry[], isMobile)}
          gap={tokens.spacing.s200}
        >
          {values.map((item) => (
            <>
              <BoxAttribute
                key={item.cycleId}
                direction="column"
                label={`${item.cycleId} ${item.nameCycle}`}
                value={item.periodicity}
              />
            </>
          ))}
        </Grid>
      )}
    </BoxContainer>
  );
};

export { RenderRegularVerification };
