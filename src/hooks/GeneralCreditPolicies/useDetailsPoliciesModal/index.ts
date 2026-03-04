import { useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { generalDataKeys } from "@config/generalCreditPolicies/assisted/generalDataKeys";
import { newDeleted } from "@utils/newDeletedDecision";
import { newInserted } from "@utils/newInsertedDecisions";
import { newUpdated } from "@utils/newUpdatedDecisions";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";
import { IUseDetailsPoliciesModal } from "@ptypes/hooks/IUseDetailsPoliciesModal";

const useDetailsPoliciesModal = (props: IUseDetailsPoliciesModal) => {
  const { data, detailsTabsConfig, decisions, isMoreDetails } = props;

  const [isSelected, setIsSelected] = useState<string>();
  const isMobile = useMediaQuery(mediaQueryMobile);

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const contribQuotaInserted = newInserted(decisions.reciprocity);
  const contribQuotaDeleted = newDeleted(decisions.reciprocity);
  const contribQuotaUpdated = newUpdated(decisions.reciprocity);

  const incomeQuotaInserted = newInserted(decisions.incomePortfolio);
  const incomeQuotaDeleted = newDeleted(decisions.incomePortfolio);
  const incomeQuotaUpdated = newUpdated(decisions.incomePortfolio);

  const scoreModelsInserted = newInserted(decisions.scoreModels);
  const scoreModelsDeleted = newDeleted(decisions.scoreModels);
  const scoreModelsUpdated = newUpdated(decisions.scoreModels);

  const minimumInserted = newInserted(decisions.minimum);
  const minimumDeleted = newDeleted(decisions.minimum);
  const minimumUpdated = newUpdated(decisions.minimum);

  const basicNotifFormatInserted = newInserted(decisions.basicNotifFormat);
  const basicNotifFormatDeleted = newDeleted(decisions.basicNotifFormat);
  const basicNotifFormatUpdated = newUpdated(decisions.basicNotifFormat);

  const basicNotifRecipientInserted = newInserted(
    decisions.basicNotifRecipient,
  );
  const basicNotifRecipientDeleted = newDeleted(decisions.basicNotifRecipient);
  const basicNotifRecipientUpdated = newUpdated(decisions.basicNotifRecipient);

  const minCredBureauRiskScoreInserted = newInserted(
    decisions.minCredBureauRiskScore,
  );
  const minCredBureauRiskScoreDeleted = newDeleted(
    decisions.minCredBureauRiskScore,
  );
  const minCredBureauRiskScoreUpdated = newUpdated(
    decisions.minCredBureauRiskScore,
  );

  const notifChannelInserted = newInserted(decisions.notifChannel);
  const notifChannelDeleted = newDeleted(decisions.notifChannel);
  const notifChannelUpdated = newUpdated(decisions.notifChannel);

  const riskScoreApiUrlInserted = newInserted(decisions.riskScoreApiUrl);
  const riskScoreApiUrlDeleted = newDeleted(decisions.riskScoreApiUrl);
  const riskScoreApiUrlUpdated = newUpdated(decisions.riskScoreApiUrl);

  const generalData = generalDataKeys.reduce(
    (genData, prop) => {
      const value = data?.[prop];
      if (value) genData[prop] = value;
      return genData;
    },
    {} as Record<string, unknown>,
  );

  const filteredTabsConfig = Object.keys(detailsTabsConfig).reduce(
    (details, key) => {
      const tab = detailsTabsConfig[key as keyof IDetailsTabsConfig];
      if (
        Object.values(generalData).length === 0 &&
        tab?.id === detailsTabsConfig.generalDecision?.id
      ) {
        return details;
      }
      if (
        (isMoreDetails || decisions.reciprocity.length === 0) &&
        tab?.id === detailsTabsConfig.contributionQuota?.id
      ) {
        return details;
      }

      if (
        contribQuotaInserted.length === 0 &&
        tab?.id === detailsTabsConfig.contribQuotaIncluded?.id
      ) {
        return details;
      }
      if (
        contribQuotaUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.contribQuotaUpdated?.id
      ) {
        return details;
      }
      if (
        contribQuotaDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.contribQuotaRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.incomePortfolio.length === 0) &&
        tab?.id === detailsTabsConfig.incomeQuota?.id
      ) {
        return details;
      }

      if (
        incomeQuotaInserted.length === 0 &&
        tab?.id === detailsTabsConfig.incomeQuotaIncluded?.id
      ) {
        return details;
      }
      if (
        incomeQuotaUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.incomeQuotaUpdated?.id
      ) {
        return details;
      }
      if (
        incomeQuotaDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.incomeQuotaRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.scoreModels.length === 0) &&
        tab?.id === detailsTabsConfig.scoreModels?.id
      ) {
        return details;
      }

      if (
        scoreModelsInserted.length === 0 &&
        tab?.id === detailsTabsConfig.scoreModelsIncluded?.id
      ) {
        return details;
      }
      if (
        scoreModelsUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.scoreModelsUpdated?.id
      ) {
        return details;
      }
      if (
        scoreModelsDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.scoreModelsRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.minimum.length === 0) &&
        tab?.id === detailsTabsConfig.minimumIncome?.id
      ) {
        return details;
      }

      if (
        minimumInserted.length === 0 &&
        tab?.id === detailsTabsConfig.minimumIncomeIncluded?.id
      ) {
        return details;
      }
      if (
        minimumUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.minimumIncomeUpdated?.id
      ) {
        return details;
      }
      if (
        minimumDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.minimumIncomeRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.basicNotifFormat.length === 0) &&
        tab?.id === detailsTabsConfig.basicNotifFormat?.id
      ) {
        return details;
      }

      if (
        basicNotifFormatInserted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifFormatIncluded?.id
      ) {
        return details;
      }
      if (
        basicNotifFormatUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifFormatUpdated?.id
      ) {
        return details;
      }
      if (
        basicNotifFormatDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifFormatRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.basicNotifRecipient.length === 0) &&
        tab?.id === detailsTabsConfig.basicNotifRecipient?.id
      ) {
        return details;
      }

      if (
        basicNotifRecipientInserted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifRecipientIncluded?.id
      ) {
        return details;
      }
      if (
        basicNotifRecipientUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifRecipientUpdated?.id
      ) {
        return details;
      }
      if (
        basicNotifRecipientDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.basicNotifRecipientRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.minCredBureauRiskScore.length === 0) &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScore?.id
      ) {
        return details;
      }

      if (
        minCredBureauRiskScoreInserted.length === 0 &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScoreIncluded?.id
      ) {
        return details;
      }
      if (
        minCredBureauRiskScoreUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScoreUpdated?.id
      ) {
        return details;
      }
      if (
        minCredBureauRiskScoreDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.minCredBureauRiskScoreRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.notifChannel.length === 0) &&
        tab?.id === detailsTabsConfig.notificationChannel?.id
      ) {
        return details;
      }

      if (
        notifChannelInserted.length === 0 &&
        tab?.id === detailsTabsConfig.notificationChannelIncluded?.id
      ) {
        return details;
      }
      if (
        notifChannelUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.notificationChannelUpdated?.id
      ) {
        return details;
      }
      if (
        notifChannelDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.notificationChannelRemoved?.id
      ) {
        return details;
      }

      if (
        (isMoreDetails || decisions.riskScoreApiUrl.length === 0) &&
        tab?.id === detailsTabsConfig.riskScoreApiUrl?.id
      ) {
        return details;
      }

      if (
        riskScoreApiUrlInserted.length === 0 &&
        tab?.id === detailsTabsConfig.riskScoreApiUrlIncluded?.id
      ) {
        return details;
      }
      if (
        riskScoreApiUrlUpdated.length === 0 &&
        tab?.id === detailsTabsConfig.riskScoreApiUrlUpdated?.id
      ) {
        return details;
      }
      if (
        riskScoreApiUrlDeleted.length === 0 &&
        tab?.id === detailsTabsConfig.riskScoreApiUrlRemoved?.id
      ) {
        return details;
      }

      if (tab !== undefined) {
        details[key as keyof IDetailsTabsConfig] = tab;
      }
      return details;
    },
    {} as IDetailsTabsConfig,
  );

  const getFirstFilteredTab = (filteredTabsConfig: IDetailsTabsConfig) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredTabsConfig)?.id;

  return {
    isSelected,
    isMobile,
    filteredTabsConfig,
    defaultSelectedTab,
    contribQuotaInserted,
    contribQuotaDeleted,
    incomeQuotaInserted,
    incomeQuotaDeleted,
    scoreModelsInserted,
    scoreModelsDeleted,
    minimumInserted,
    minimumDeleted,
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
    contribQuotaUpdated,
    incomeQuotaUpdated,
    scoreModelsUpdated,
    minimumUpdated,
    basicNotifFormatUpdated,
    basicNotifRecipientUpdated,
    minCredBureauRiskScoreUpdated,
    notifChannelUpdated,
    riskScoreApiUrlUpdated,
    handleTabChange,
  };
};

export { useDetailsPoliciesModal };
