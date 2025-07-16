import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";

interface IAuthAndPortalData {
  appData: IAppData;
  businessUnitSigla: string;
  useCases: string;
  businessUnitsToTheStaff: IBusinessUnitsPortalStaff[];
  setAppData: React.Dispatch<React.SetStateAction<IAppData>>;
  setBusinessUnitSigla: React.Dispatch<React.SetStateAction<string>>;
  setUseCases: React.Dispatch<React.SetStateAction<string>>;
  setBusinessUnitsToTheStaff: React.Dispatch<
    React.SetStateAction<IBusinessUnitsPortalStaff[]>
  >;
}

export type { IAuthAndPortalData };
