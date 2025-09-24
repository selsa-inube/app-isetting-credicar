import { BusinessRulesNewHandler } from "@pages/creditLines/tabs/BusinessRulesNewHandler";
import { decisionTemplates } from "@config/creditLines/decisionTemplates/registry";
import { Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { LineInformation } from "../lineInformation";
import { options } from "@config/creditLines/configuration/mainOptions";
import { IDecisionTemplateScreen } from "@ptypes/decisions/IDecisionTemplateScreen";
import { commonTextValues } from "@config/creditLines/decisionTemplates/commonTextValues";

const DecisionTemplateScreen = (props: IDecisionTemplateScreen) => {
  const { templateKey, initialDecisions = [], language = "es" } = props;
  const decisionTemplate = decisionTemplates[templateKey];
  const noop = () => {
    console.log("noop");
  };
  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
      width="-webkit-fill-available"
    >
      <LineInformation
        lineName="CRÉDITO INTELIGENTE 24/7 CON RESPUESTA INTANTÁNEA"
        lineType={options.AmortizationCollectionDebt.links.loanTerm.label}
        updateData={false}
        loading={false}
        withoutDecisions={true}
        onToggleInfoModal={noop}
        onOpenModal={noop}
      />

      <BusinessRulesNewHandler
        controls
        decisionTemplate={decisionTemplate}
        initialDecisions={initialDecisions}
        language={language}
        loading={false}
        textValues={commonTextValues}
      />
    </Stack>
  );
};

export { DecisionTemplateScreen };
