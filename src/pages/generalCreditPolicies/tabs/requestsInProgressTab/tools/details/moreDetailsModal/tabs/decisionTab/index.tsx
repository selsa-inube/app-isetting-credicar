import { ENameRules } from "@enum/nameRules";
import { EUseCase } from "@enum/useCase";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { NewDecisionForm } from "@design/forms/NewDecisionForm";
import { decisionTemplateGenPolicies } from "@config/decisions/decisionTemplateGenPolicies";
import { IDecisionTab } from "@ptypes/generalCredPolicies/IDecisionTab";
import { StyledContainer } from "../styles";

const DecisionTab = (props: IDecisionTab) => {
  const { data } = props;

  return (
    <BoxContainer
      direction="column"
      gap={tokens.spacing.s300}
      justifyContent="space-between"
      height="85%"
      width="100%"
      boxSizing="border-box"
      overflowY="auto"
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
    </BoxContainer>
  );
};

export { DecisionTab };
