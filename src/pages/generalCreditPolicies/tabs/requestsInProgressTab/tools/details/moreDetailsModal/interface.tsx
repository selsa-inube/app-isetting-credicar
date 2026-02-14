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
    showBasicNotifFormat,
    showBasicNotifFormatInserted,
    showBasicNotifFormatDeleted,
    showBasicNotifRecipient,
    showBasicNotifRecipientInserted,
    showBasicNotifRecipientDeleted,
    showMinCredBureauRiskScore,
    showMinCredBureauRiskInserted,
    showMinCredBureauRiskDeleted,
    showNotifChannel,
    showNotifChanneInserted,
    showNotifChanneDeleted,
    showRiskScoreApiUrl,
    showRiskScoreApiUrlInserted,
    showRiskScoreApiUrlDeleted,
    minimumInserted,
    minimumDeleted,
    data,
    portalId,
    decisions,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    basicNotifFormatInserted,
    basicNotifFormatDeleted,
    basicNotifRecipientInserted,
    basicNotifRecipientDeleted,
    minCredBureauRiskScoreInserted,
    minCredBureauRiskScoreDeleted,
    notifChannelInserted,
    notifChannelDeleted,
    riskScoreApiUrlInserted,
    riskScoreApiUrlDeleted,
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
        {showDecisionsRecip && <DecisionTab data={decisions.reciprocity} />}
        {showContribInserted && (
          <DecisionTab data={contribQuotaInserted ?? []} />
        )}
        {showContribDeleted && <DecisionTab data={contribQuotaDeleted ?? []} />}
        {showDecisionsIncome && (
          <DecisionTab data={decisions.incomePortfolio} />
        )}
        {showIncomeInserted && <DecisionTab data={incomeQuotaInserted ?? []} />}
        {showIncomeDeleted && <DecisionTab data={incomeQuotaDeleted ?? []} />}
        {showScoreModels && <DecisionTab data={decisions.scoreModels} />}
        {showScoreModelsInserted && (
          <DecisionTab data={scoreModelsInserted ?? []} />
        )}
        {showScoreModelsDeleted && (
          <DecisionTab data={scoreModelsDeleted ?? []} />
        )}

        {showMinimum && <DecisionTab data={decisions.minimum} />}
        {showMinimumInserted && <DecisionTab data={minimumInserted ?? []} />}
        {showMinimumDeleted && <DecisionTab data={minimumDeleted ?? []} />}

        {showBasicNotifFormat && (
          <DecisionTab data={decisions.basicNotifFormat} />
        )}
        {showBasicNotifFormatInserted && (
          <DecisionTab data={basicNotifFormatInserted ?? []} />
        )}
        {showBasicNotifFormatDeleted && (
          <DecisionTab data={basicNotifFormatDeleted ?? []} />
        )}

        {showBasicNotifRecipient && (
          <DecisionTab data={decisions.basicNotifRecipient} />
        )}
        {showBasicNotifRecipientInserted && (
          <DecisionTab data={basicNotifRecipientInserted ?? []} />
        )}
        {showBasicNotifRecipientDeleted && (
          <DecisionTab data={basicNotifRecipientDeleted ?? []} />
        )}

        {showMinCredBureauRiskScore && (
          <DecisionTab data={decisions.minCredBureauRiskScore} />
        )}
        {showMinCredBureauRiskInserted && (
          <DecisionTab data={minCredBureauRiskScoreInserted ?? []} />
        )}
        {showMinCredBureauRiskDeleted && (
          <DecisionTab data={minCredBureauRiskScoreDeleted ?? []} />
        )}

        {showNotifChannel && <DecisionTab data={decisions.notifChannel} />}

        {showNotifChanneInserted && (
          <DecisionTab data={notifChannelInserted ?? []} />
        )}
        {showNotifChanneDeleted && (
          <DecisionTab data={notifChannelDeleted ?? []} />
        )}

        {showRiskScoreApiUrl && (
          <DecisionTab data={decisions.riskScoreApiUrl} />
        )}

        {showRiskScoreApiUrlInserted && (
          <DecisionTab data={riskScoreApiUrlInserted ?? []} />
        )}
        {showRiskScoreApiUrlDeleted && (
          <DecisionTab data={riskScoreApiUrlDeleted ?? []} />
        )}
        <Divider />
      </Stack>
    </ModalWrapper>
  );
};

export { MoreDetailsModalUI };
