import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { IEnumerators } from "@ptypes/IEnumerators";

interface IUseDragAndDropBoxesForm {
  templateKey: string;
  ruleOption: string;
  optionsIncluded: IDragAndDropColumn;
  optionsExcluded: IDragAndDropColumn;
  ruleLoadding: boolean;
  infoRuleName: string;
  supportLine: IEnumerators[];
  loadingSupportOptions: boolean;
  setOptionsIncluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  setOptionsExcluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
}

export type { IUseDragAndDropBoxesForm };
