import { IconWithText } from "@design/data/iconWithText";
import { getIcon } from "@utils/getIcon";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";

const mapMoneyDestinationToEntity = (
  data: IMoneyDestinationData,
): IMoneyDestinationData => {
  const business: IMoneyDestinationData = {
    id: String(data.moneyDestinationId),
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={getIcon(data.iconReference)}
        text={String(data.abbreviatedName)}
      />
    ),
    descriptionUse: String(data.descriptionUse),
    iconReference: String(data.iconReference),
    moneyDestinationId: String(data.moneyDestinationId),
    name: String(data.abbreviatedName),
    typeDestination: String(data.typeDestination),
    creditLine: String(data.creditLine),
    moneyDestinationType: String(data.moneyDestinationType),
  };

  return business;
};
export { mapMoneyDestinationToEntity };
