interface IMoneyDestinationData {
  abbreviatedName: string | React.ReactNode;
  descriptionUse: string;
  iconReference: string;
  moneyDestinationId: string;
  moneyDestinationType: string;
  id?: string | number;
  name?: string;
  typeDestination?: string;
  creditLine?: string;
}

export type { IMoneyDestinationData };
