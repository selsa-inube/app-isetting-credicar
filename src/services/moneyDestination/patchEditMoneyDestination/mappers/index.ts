import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";

const mapEditMoneyDestinationEntityToApi = (
  data: IRequestMoneyDestination,
): IRequestMoneyDestination => {
  return {
    abbreviatedName: data.abbreviatedName,
    descriptionUse: data.descriptionUse,
    iconReference: data.iconReference,
    moneyDestinationId: data.moneyDestinationId,
    modifyJustification: data.modifyJustification,
    rules: data.rules,
    settingRequest: data.settingRequest,
  };
};

export { mapEditMoneyDestinationEntityToApi };
