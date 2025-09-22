import { ITab } from "@inubekit/inubekit";
import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IRequestsInProcess {
  data: IEntry;
  title: string;
  labelsOfRequest: ILabel[];
  labelsOfTraceability: ILabel[];
  isMobile: boolean;
  isSelected: string;
  filteredTabs: ITab[];
  showTrazabilityData: boolean;
  showErrorData: boolean;
  withErrorRequest: boolean;
  loading: boolean;
  onTabChange: (id: string) => void;
  onCloseModal: () => void;
  onClick: () => void;
  onApproval: () => void;
}

export type { IRequestsInProcess };
