import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IEnumerators } from "@ptypes/IEnumerators";

interface IUseDragAndDropBoxesForm {
  templateKey: string;
  ruleOption: string;
  optionsIncluded: IDragAndDropColumn;
  optionsExcluded: IDragAndDropColumn;
  ruleLoadding: boolean;
  useCaseConfiguration: string;
  infoRuleName: string;
  linesConstructionData: ILinesConstructionData;
  supportLine: IEnumerators[];
  loadingSupportOptions: boolean;
  setOptionsIncluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  setOptionsExcluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  clientSupportData?: IRules[];
  setClientSupportData: React.Dispatch<
    React.SetStateAction<IRules[] | undefined>
  >;
}

export type { IUseDragAndDropBoxesForm };
