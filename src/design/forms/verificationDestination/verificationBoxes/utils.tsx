import { IRuleDecision } from "@isettingkit/input";
import { Stack, Tag, Text } from "@inubekit/inubekit";

import { BoxAttribute } from "@design/feedback/boxAttributes";
import { tokens } from "@design/tokens";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ComponentAppearance } from "@enum/appearances";
import { StyledAttribute, StyledConatinerAttribute } from "./styles";

const renderPersonalInfoVerification = (values: IGeneralInformationEntry) => (
  <>
    <Stack width="100%" direction="column" gap={tokens.spacing.s200}>
      <BoxAttribute
        direction="column"
        label="Nombre del destino:"
        value={values.nameDestination}
      />
      <BoxAttribute
        direction="column"
        label="Descripción:"
        value={values.description}
      />
    </Stack>
  </>
);

const renderCreditlineVerification = (values: IRuleDecision[]) => (
  <StyledConatinerAttribute>
    <Stack
      padding={`${tokens.spacing.s0} ${tokens.spacing.s200}`}
      direction="column"
    >
      <Text
        type="label"
        appearance={ComponentAppearance.DARK}
        weight="bold"
        size="small"
      >
        Líneas de crédito
      </Text>
    </Stack>
    <StyledAttribute>
      {values && values.length > 0 ? (
        <>
          {values.map((decision, index) => (
            <Tag
              key={index}
              appearance={ComponentAppearance.GRAY}
              label={
                typeof decision.value === "object"
                  ? JSON.stringify(decision.value)
                  : String(decision.value)
              }
            />
          ))}
        </>
      ) : (
        <Tag
          appearance={ComponentAppearance.DANGER}
          label="Ninguna línea de crédito configurada"
        />
      )}
    </StyledAttribute>
  </StyledConatinerAttribute>
);

export { renderPersonalInfoVerification, renderCreditlineVerification };
