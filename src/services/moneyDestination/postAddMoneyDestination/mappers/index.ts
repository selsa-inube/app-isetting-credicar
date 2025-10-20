import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";

const mapAddMoneyDestinationEntityToApi = (
  data: IRequestMoneyDestination,
): IRequestMoneyDestination => {
  return {
    abbreviatedName: data.abbreviatedName,
    descriptionUse: data.descriptionUse,
    iconReference: data.iconReference,
    moneyDestinationType: data.moneyDestinationType,
    rules: data.rules,
    settingRequest: data.settingRequest,
  };
};

export { mapAddMoneyDestinationEntityToApi };
