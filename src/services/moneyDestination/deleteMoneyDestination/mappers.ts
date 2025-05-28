import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";

const mapDeleteMoneyDestToApi = (
  data: IRequestMoneyDestination,
): Record<string, string | number | object> => {
  return {
    abbreviatedName: data.abbreviatedName ?? "",
    moneyDestinationId: data.moneyDestinationId ?? "",
    removalJustification: data.removalJustification ?? "",
    settingRequest: data.settingRequest ?? {},
  };
};

export { mapDeleteMoneyDestToApi };
