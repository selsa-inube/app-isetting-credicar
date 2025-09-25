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
  labelButton: string;
  iconButton: React.ReactElement;
  onTabChange: (id: string) => void;
  onCloseModal: () => void;
  onClick: () => void;
  onThirdClick: () => void;
}

export type { IRequestsInProcess };
