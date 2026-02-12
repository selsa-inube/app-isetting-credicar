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
    showMinimum,
    showMinimumInserted,
    showMinimumDeleted,
    decisionsMinimum,
    minimumInserted,
    minimumDeleted,
    data,
    portalId,
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
      height={isMobile ? "auto" : "690px"}
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
        {showDecisionsRecip && <DecisionTab data={decisionsReciprocity} />}
        {showContribInserted && (
          <DecisionTab data={contribQuotaInserted ?? []} />
        )}
        {showContribDeleted && <DecisionTab data={contribQuotaDeleted ?? []} />}
        {showDecisionsIncome && <DecisionTab data={decisionsIncomePortfolio} />}
        {showIncomeInserted && <DecisionTab data={incomeQuotaInserted ?? []} />}
        {showIncomeDeleted && <DecisionTab data={incomeQuotaDeleted ?? []} />}
        {showScoreModels && <DecisionTab data={decisionsScoreModels} />}
        {showScoreModelsInserted && (
          <DecisionTab data={scoreModelsInserted ?? []} />
        )}
        {showScoreModelsDeleted && (
          <DecisionTab data={scoreModelsDeleted ?? []} />
        )}

        {showMinimum && <DecisionTab data={decisionsMinimum} />}
        {showMinimumInserted && <DecisionTab data={minimumInserted ?? []} />}
        {showMinimumDeleted && <DecisionTab data={minimumDeleted ?? []} />}
        <Divider />
      </Stack>
    </ModalWrapper>
  );
};

export { MoreDetailsModalUI };
