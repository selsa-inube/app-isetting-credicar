import { FormikProps } from "formik";
import { IServerDomain } from "@ptypes/IServerDomain";
import { ICompanyEntry } from "../ICompanyEntry";
import { IOption } from "@inubekit/inubekit";

interface ICompanyFormUI {
  formik: FormikProps<ICompanyEntry>;
  loading: boolean;
  optionsCountries: IServerDomain[];
  optionsCities: IServerDomain[];
  legalPerson: IServerDomain[];
  isMobile: boolean;
  showModal: boolean;
  titleAlertModal: string;
  descriptionModal: string;
  actionTextModal: string;
  moreDetailsModal?: string;
  isAddingCompany?: boolean;
  optionsIdentification: IOption[];
  onToggleAlertModal: () => void;
  onChange: (name: string, value: string) => void;
  onCompanyChange: (name: string, value: string) => void;
  onButtonClick: () => void;
  isDisabledButton?: boolean;
}

export type { ICompanyFormUI };
