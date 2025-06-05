import { BusinessRules } from "@isettingkit/business-rules";
import { Stack } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { IDecisionTab } from "@ptypes/generalCredPolicies/IDecisionTab";
import { StyledContainer } from "../styles";

const DecisionTab = (props: IDecisionTab) => {
  const { data, textValues, decisionTemplate } = props;

  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      justifyContent="space-between"
      height="85%"
    >
      <StyledContainer>
        <BusinessRules
          controls={false}
          decisions={data}
          textValues={textValues}
          decisionTemplate={decisionTemplate}
          isModalOpen={false}
          selectedDecision={null}
          loading={false}
          handleOpenModal={() => void 0}
          handleCloseModal={() => void 0}
          handleSubmitForm={() => void 0}
          handleDelete={() => void 0}
        />
      </StyledContainer>
    </Stack>
  );
};

export { DecisionTab };
