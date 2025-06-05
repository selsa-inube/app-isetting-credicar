import { useState } from "react";
import { ICondition, IRuleDecision } from "@isettingkit/input";
import { useMediaQuery } from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { TransactionOperation } from "@enum/transactionOperation";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@ptypes/moneyDestination/tabs/IDetailsTabsConfig";

const useDetailsDestinationModal = (
  data: IEntry,
  detailsTabsConfig: IDetailsTabsConfig,
  decisions: IRuleDecision[],
  isMoreDetails?: boolean,
) => {
  const [isSelected, setIsSelected] = useState<string>();
  const isMobile = useMediaQuery(mediaQueryMobile);

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const filteredTabsConfig = Object.keys(detailsTabsConfig).reduce(
    (acc, key) => {
      const tab = detailsTabsConfig[key as keyof IDetailsTabsConfig];
      if (
        data.abbreviatedName === undefined &&
        data.descriptionUse === undefined &&
        tab?.id === detailsTabsConfig.generalData.id
      ) {
        return acc;
      }
      if (
        (isMoreDetails || decisions.length === 0) &&
        tab?.id === detailsTabsConfig.creditLine.id
      ) {
        return acc;
      }

      if (
        !decisions.some(
          (decision) =>
            decision.transactionOperation === TransactionOperation.INSERT,
        ) &&
        tab?.id === detailsTabsConfig.creditLineIncluded?.id
      ) {
        return acc;
      }
      if (
        !decisions.some(
          (decision) =>
            decision.transactionOperation === TransactionOperation.DELETE,
        ) &&
        tab?.id === detailsTabsConfig.creditLineRemoved?.id
      ) {
        return acc;
      }
      if (tab !== undefined) {
        acc[key as keyof IDetailsTabsConfig] = tab;
      }
      return acc;
    },
    {} as IDetailsTabsConfig,
  );

  const filteredDecisions = decisions.map((decision: IRuleDecision) => {
    return {
      ...decision,
      conditionsThatEstablishesTheDecision: (
        decision.conditionsThatEstablishesTheDecision ?? []
      ).filter(
        (condition: ICondition) =>
          condition.conditionName !== "MoneyDestination",
      ),
    };
  });

  const decisionDeleted = filteredDecisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === TransactionOperation.DELETE,
  );
  const decisionInserted = filteredDecisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === TransactionOperation.INSERT,
  );

  const getFirstFilteredTab = (filteredTabsConfig: IDetailsTabsConfig) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = filteredTabsConfig.generalData
    ? detailsTabsConfig.generalData.id
    : getFirstFilteredTab(filteredTabsConfig)?.id;

  return {
    isSelected,
    isMobile,
    filteredTabsConfig,
    defaultSelectedTab,
    decisionDeleted,
    decisionInserted,
    filteredDecisions,
    handleTabChange,
  };
};

export { useDetailsDestinationModal };
