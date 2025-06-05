import { Stack, Divider, Tabs } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { moreDetailsLabels } from "@config/generalCreditPolicies/requestsInProgressTab/details/moreDetailsLabels";
import { generalDataLabels } from "@config/generalCreditPolicies/requestsInProgressTab/details/generaDataLabels";
import { IMoreDetailsModalUI } from "@ptypes/generalCredPolicies/IMoreDetailsModalUI";
import { GeneralDecisionsTab } from "./tabs/generalDataTab";
import { DecisionTab } from "./tabs/decisionTab";

const MoreDetailsModalUI = (props: IMoreDetailsModalUI) => {
  const {
    isSelected,
    filteredTabsConfig,
    detailsTabsConfig,
    isMoreDetails,
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
        {isSelected === detailsTabsConfig.generalDecision?.id && (
          <GeneralDecisionsTab data={data} labelsDetails={generalDataLabels} />
        )}
        {!isMoreDetails &&
          isSelected === detailsTabsConfig.contributionQuota?.id &&
          decisionsReciprocity.length > 0 && (
            <DecisionTab
              data={decisionsReciprocity}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {isMoreDetails &&
          isSelected === detailsTabsConfig.contribQuotaIncluded?.id && (
            <DecisionTab
              data={contribQuotaInserted ?? []}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {isMoreDetails &&
          isSelected === detailsTabsConfig.contribQuotaRemoved?.id && (
            <DecisionTab
              data={contribQuotaDeleted ?? []}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {!isMoreDetails &&
          isSelected === detailsTabsConfig.incomeQuota?.id &&
          decisionsIncomePortfolio.length > 0 && (
            <DecisionTab
              data={decisionsIncomePortfolio}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {isMoreDetails &&
          isSelected === detailsTabsConfig.incomeQuotaIncluded?.id && (
            <DecisionTab
              data={incomeQuotaInserted ?? []}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {isMoreDetails &&
          isSelected === detailsTabsConfig.incomeQuotaRemoved?.id && (
            <DecisionTab
              data={incomeQuotaDeleted ?? []}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {!isMoreDetails &&
          isSelected === detailsTabsConfig.scoreModels?.id &&
          decisionsScoreModels.length > 0 && (
            <DecisionTab
              data={decisionsScoreModels}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {isMoreDetails &&
          isSelected === detailsTabsConfig.scoreModelsIncluded?.id && (
            <DecisionTab
              data={scoreModelsInserted ?? []}
              textValues={textValues}
              decisionTemplate={decisionTemplate}
            />
          )}
        {isMoreDetails &&
          isSelected === detailsTabsConfig.scoreModelsRemoved?.id && (
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
