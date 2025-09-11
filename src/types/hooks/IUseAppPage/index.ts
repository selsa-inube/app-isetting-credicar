/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from "react-router-dom";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";

interface IUseAppPage {
  appData: IAppData;
  location: Location<any>;
  businessUnitSigla: string;
  setBusinessUnitSigla: React.Dispatch<React.SetStateAction<string>>;
}

export type { IUseAppPage };
