import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";
import { IDecisionsDetails } from "@ptypes/generalCredPolicies/forms/IDecisionsDetails";

interface IUseDetailsPoliciesModal {
  data: IEntry;
  detailsTabsConfig: IDetailsTabsConfig;
  decisions: IDecisionsDetails;
  isMoreDetails?: boolean;
}

export type { IUseDetailsPoliciesModal };
