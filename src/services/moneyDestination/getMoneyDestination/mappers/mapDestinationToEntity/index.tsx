import { MdCategory } from "react-icons/md";
import { IconWithText } from "@design/data/iconWithText";
import { normalizeIconDestination } from "@utils/destination/normalizeIconDestination";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";

const mapMoneyDestinationToEntity = (
  data: IMoneyDestinationData,
): IMoneyDestinationData => {
  const business: IMoneyDestinationData = {
    id: String(data.moneyDestinationId),
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={
          normalizeIconDestination(data.iconReference)?.icon ?? (
            <MdCategory size={20} />
          )
        }
        text={String(data.abbreviatedName)}
      />
    ),
    descriptionUse: String(data.descriptionUse),
    iconReference: String(data.iconReference),
    moneyDestinationId: String(data.moneyDestinationId),
    name: String(data.abbreviatedName),
  };

  return business;
};
export { mapMoneyDestinationToEntity };
