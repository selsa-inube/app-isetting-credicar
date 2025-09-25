import { Stack, Divider, Tabs } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { moreDetailsLabels } from "@config/generalCreditPolicies/requestsInProgressTab/details/moreDetailsLabels";
import { generalDataLabels } from "@config/generalCreditPolicies/requestsInProgressTab/details/generaDataLabels";
import { IMoreDetailsModalUI } from "@ptypes/generalCredPolicies/IMoreDetailsModalUI";
import { GeneralTab } from "./generalDataTab";
import { DecisionTab } from "./tabs/decisionTab";

const MoreDetailsModalUI = (props: IMoreDetailsModalUI) => {
  const {
    isSelected,
    filteredTabsConfig,
    showGeneralDecisionsTab,
    showDecisionsRecip,
    showContribInserted,
    showContribDeleted,
    showDecisionsIncome,
    showIncomeInserted,
    showIncomeDeleted,
    showScoreModels,
    showScoreModelsInserted,
    showScoreModelsDeleted,
    data,
    portalId,
    textValues,
    decisionTemplate,
    decisionsReciprocity,
    decisionsIncomePortfolio,
    decisionsScoreModels,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    isMobile,
    onCloseModal,
    onTabChange,
  } = props;

  return (
    <ModalWrapper
      portalId={portalId}
      width={isMobile ? "335px" : "720px"}
      height={isMobile ? "auto" : "660px"}
      isMobile={isMobile}
      labelActionButton={moreDetailsLabels.close}
      labelCloseModal={moreDetailsLabels.close}
      title={moreDetailsLabels.title}
      onCloseModal={onCloseModal}
      onClick={onCloseModal}
    >
      <Stack gap={tokens.spacing.s150} direction="column" height="100%">
        <Tabs
          tabs={Object.values(filteredTabsConfig)}
          selectedTab={isSelected}
          onChange={onTabChange}
          scroll={Object.values(filteredTabsConfig).length > 2}
        />
        {showGeneralDecisionsTab && (
          <GeneralTab data={data} labelsDetails={generalDataLabels} />
        )}
        {showDecisionsRecip && (
          <DecisionTab
            data={decisionsReciprocity}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showContribInserted && (
          <DecisionTab
            data={contribQuotaInserted ?? []}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showContribDeleted && (
          <DecisionTab
            data={contribQuotaDeleted ?? []}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showDecisionsIncome && (
          <DecisionTab
            data={decisionsIncomePortfolio}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showIncomeInserted && (
          <DecisionTab
            data={incomeQuotaInserted ?? []}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showIncomeDeleted && (
          <DecisionTab
            data={incomeQuotaDeleted ?? []}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showScoreModels && (
          <DecisionTab
            data={decisionsScoreModels}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showScoreModelsInserted && (
          <DecisionTab
            data={scoreModelsInserted ?? []}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        {showScoreModelsDeleted && (
          <DecisionTab
            data={scoreModelsDeleted ?? []}
            textValues={textValues}
            decisionTemplate={decisionTemplate}
          />
        )}
        <Divider />
      </Stack>
    </ModalWrapper>
  );
};

export { MoreDetailsModalUI };
