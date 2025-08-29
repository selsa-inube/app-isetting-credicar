import { Grid, Stack } from "@inubekit/inubekit";

import { useEnumeratorsIsaas } from "@hooks/useEnumeratorsIsaas";
import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { enviroment } from "@config/environment";
import { verificationLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/verificationLabels";
import { IRenderCompanyVerification } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IRenderCompanyVerification";
import { ILanguage } from "@ptypes/i18n";

const RenderCompanyVerification = (props: IRenderCompanyVerification) => {
  const { values, isMobile } = props;

  const isCompanySelected = values.companySelected !== "addCompany";
  const { enumData: typeIdentification } = useEnumeratorsIsaas({
    enumIsaas: ECyclesPayroll.TYPE_IDENTIFICATION_COMPANY,
  });
  const value = `${normalizeDestination(typeIdentification, values.companyTypeIdent ?? "")?.i18n?.[enviroment.VITE_LANGUAGE as ILanguage]} - ${values.companyNumberIdent} - ${values.companyCountry}`;
  return (
    <>
      {isCompanySelected ? (
        <Stack width="100%" direction="column" gap={tokens.spacing.s200}>
          <BoxAttribute
            direction="column"
            label={verificationLabels.companyAgreement}
            value={values.companySelected}
          />
        </Stack>
      ) : (
        <>
          <Stack width="100%" direction="column" gap={tokens.spacing.s200}>
            <BoxAttribute
              direction="column"
              label={verificationLabels.companyName}
              value={values.companyName}
            />
          </Stack>
          <Grid
            width="100%"
            templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
            templateRows={isMobile ? "repeat(4, 1fr)" : "repeat(2, 1fr)"}
            gap={tokens.spacing.s200}
          >
            <BoxAttribute
              direction="column"
              label={verificationLabels.tradeName}
              value={values.companyNameCommercial}
            />
            <BoxAttribute
              direction="column"
              label={verificationLabels.countryTaxResidence}
              value={values.companyCountry}
            />
            <BoxAttribute
              direction="column"
              label={verificationLabels.companyId}
              value={value}
            />
            <BoxAttribute
              direction="column"
              label={verificationLabels.headquartersAddress}
              value={`${values.companyAddressRes} - ${values.companyComplement} - ${values.companyCity}`}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export { RenderCompanyVerification };
