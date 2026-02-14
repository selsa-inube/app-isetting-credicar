import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";
import { IDecisionsDetails } from "@ptypes/generalCredPolicies/forms/IDecisionsDetails";

interface IUseMoreDetailsModal {
  isSelected: string;
  detailsTabsConfig: IDetailsTabsConfig;
  isMoreDetails: boolean;
  decisions: IDecisionsDetails;
}

export type { IUseMoreDetailsModal };
