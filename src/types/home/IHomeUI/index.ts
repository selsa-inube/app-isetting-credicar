import { IFullscreenNav } from "@inubekit/inubekit";

import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { ICardData } from "../ICardData";

interface IHomeUI {
  appData: IAppData;
  businessUnitChangeRef: React.RefObject<HTMLDivElement>;
  businessUnitsToTheStaff: IBusinessUnitsPortalStaff[];
  collapse: boolean;
  collapseMenuRef: React.RefObject<HTMLDivElement>;
  selectedClient: string;
  username: string;
  screenMobile: boolean;
  screenTablet: boolean;
  screenTabletHeader: boolean;
  dataExists: boolean;
  optionsHeader: {
    nav: IFullscreenNav;
    breakpoint?: string;
  };
  hasMultipleBusinessUnits: boolean;
  handleLogoClick: (businessUnit: IBusinessUnitsPortalStaff) => void;
  setCollapse: (value: boolean) => void;
  loading: boolean;
  data: ICardData[];
}

export type { IHomeUI };
