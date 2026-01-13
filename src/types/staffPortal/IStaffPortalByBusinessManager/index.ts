import { IOptionsByStaffPortalBusinessManager } from "@ptypes/staffPortal/IOptionsByStaffPortalBusinessManager";

interface IStaffPortalByBusinessManager {
  abbreviatedName: string;
  businessManagerCode: string;
  businessManagerName: string;
  descriptionUse: string;
  publicCode: string;
  staffPortalCatalogCode: string;
  staffPortalId: string;
  clientId: string;
  url: string;
  brandImageUrl: string;
  optionsByStaffPortalBusinessManager?: IOptionsByStaffPortalBusinessManager[];
  [key: string]: string | IOptionsByStaffPortalBusinessManager[] | undefined;
}

export type { IStaffPortalByBusinessManager };
