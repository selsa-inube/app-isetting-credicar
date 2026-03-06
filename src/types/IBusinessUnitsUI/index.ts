import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { IBusinessUnitstate } from "@ptypes/selectBusinessUnits/outlets/businessUnit/IBusinessUnitstate";

interface IBusinessUnitsUI {
  businessUnits: IBusinessUnitsPortalStaff[];
  search: string;
  businessUnit: IBusinessUnitstate;
  screenMobile: boolean;
  screenTablet: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBussinessUnitChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  filterBusinessUnits: (
    businessUnits: IBusinessUnitsPortalStaff[],
    search: string,
  ) => IBusinessUnitsPortalStaff[];
  handleSubmit: () => void;
}

export type { IBusinessUnitsUI };
