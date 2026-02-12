import { Stack } from "@inubekit/inubekit";

import { ENameRules } from "@enum/nameRules";
import { EUseCase } from "@enum/useCase";
import { tokens } from "@design/tokens";
import { NewDecisionForm } from "@design/forms/NewDecisionForm";
import { decisionTemplateGenPolicies } from "@config/decisions/decisionTemplateGenPolicies";
import { IDecisionTab } from "@ptypes/generalCredPolicies/IDecisionTab";
import { StyledContainer } from "../styles";

const DecisionTab = (props: IDecisionTab) => {
  const { data } = props;

  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      justifyContent="space-between"
      height="85%"
    >
      <StyledContainer>
        <NewDecisionForm
          ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
          labelBusinessRules={""}
          customMessageEmptyDecisions={""}
          initialDecisions={data}
          editionMode={"classic"}
          option={EUseCase.DETAILS}
          loading={false}
          onPreviousStep={() => void 0}
          disabledButton={false}
          decisionTemplateConfig={decisionTemplateGenPolicies}
          setDecisionData={() => void 0}
          onSave={() => void 0}
        />
      </StyledContainer>
    </Stack>
  );
};

export { DecisionTab };
