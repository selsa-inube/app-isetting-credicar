import { useContext } from "react";
import { Grid, useMediaQuery } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCreditLine } from "@hooks/moneyDestination/useCreditLine";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { EMoneyDestination } from "@enum/moneyDestination";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { normalizeOptions } from "@utils/destination/normalizeOptions";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { mediaQueryTablet } from "@config/environment";
import { personalInfoVeriflabels } from "@config/moneyDestination/moneyDestinationTab/form/personalInfoVeriflabels";
import { IPersonalInfoVerification } from "@ptypes/moneyDestination/tabs/IPersonalInfoVerification";
import { II18n } from "@ptypes/i18n";

const RenderPersonalInfoVerification = (props: IPersonalInfoVerification) => {
  const { values } = props;

  const { appData } = useContext(AuthAndPortalData);
  const isTablet = useMediaQuery(mediaQueryTablet);

  const { optionsCreditLine } = useCreditLine();
  const { enumDestination } = useEnumsMoneyDestination({
    businessUnits: appData.businessUnit.publicCode,
  });

  const { enumData: type } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EMoneyDestination.DESTINATION_TYPE,
  });

  const typeDestination = normalizeDestination(type, values.typeDestination);
  const valueTypeDestination =
    typeDestination?.i18n?.[
      appData.language as keyof typeof typeDestination.i18n
    ] ?? typeDestination?.description;

  const normalizeLine = values.creditLine
    .split(",")
    .map((item) => {
      return normalizeOptions(optionsCreditLine, item.trim())?.label;
    })
    .join(", ");

  const normalizeName = normalizeDestination(
    enumDestination,
    values.nameDestination,
  );
  const valueName =
    normalizeName?.i18nValue?.[appData.language as keyof II18n] ??
    values.nameDestination;

  return (
    <Grid
      width="100%"
      templateColumns={isTablet ? "1fr" : "repeat(2, 1fr)"}
      templateRows={isTablet ? "repeat(4, 1fr)" : "repeat(2, 1fr)"}
      gap={tokens.spacing.s200}
    >
      <BoxAttribute
        direction="column"
        label={personalInfoVeriflabels.type}
        value={valueTypeDestination}
      />
      <BoxAttribute
        direction="column"
        label={personalInfoVeriflabels.nameDestination}
        value={valueName}
      />
      {normalizeLine && (
        <BoxAttribute
          direction="column"
          label={personalInfoVeriflabels.creditLine}
          value={normalizeLine}
        />
      )}
      <BoxAttribute
        direction="column"
        label={personalInfoVeriflabels.description}
        value={values.description}
      />
    </Grid>
  );
};

export { RenderPersonalInfoVerification };
