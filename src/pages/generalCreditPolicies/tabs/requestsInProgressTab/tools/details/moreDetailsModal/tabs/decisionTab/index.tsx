import { useContext } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { ENameRules } from "@enum/nameRules";
import { EUseCase } from "@enum/useCase";
import { transformDecisions } from "@utils/transforDecisionPolicies";
import { getConditionsTraduction } from "@utils/getConditionsTraduction";
import { capitalizeText } from "@utils/capitalizeText";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { NewDecisionForm } from "@design/forms/NewDecisionForm";
import { decisionTemplateGenPolicies } from "@config/decisions/decisionTemplateGenPolicies";
import { IDecisionTab } from "@ptypes/generalCredPolicies/IDecisionTab";
import { StyledContainer } from "../styles";

const DecisionTab = (props: IDecisionTab) => {
  const { data } = props;

  const { appData } = useContext(AuthAndPortalData);

  const { ruleData } = useEnumRules({
    enumDestination: ENameRules.NOTIFICATION_CHANNEL,
    ruleCatalog: ENameRules.RULE_CATALOG_CREDIBOARD,
    catalogAction: capitalizeText(ENameRules.RULE_CATALOG_CREDIBOARD),
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const {
    conditionTraduction,
    ruleNameTraduction,
    listValuesDecision,
    dataType,
  } = getConditionsTraduction(ruleData, appData.language);

  const normalizeDecisionsData = transformDecisions(
    data,
    ruleNameTraduction as string,
    dataType,
    listValuesDecision,
    conditionTraduction,
  ) as IRuleDecision[];

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
          initialDecisions={normalizeDecisionsData}
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
