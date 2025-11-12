import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";

interface IUseDragAndDropBoxesForm {
  templateKey: string;
  ruleOption: string;
  optionsIncluded: IDragAndDropColumn;
  optionsExcluded: IDragAndDropColumn;
  ruleLoadding: boolean;
  infoRuleName: string;
  supportLine: IEnumerators[];
  loadingSupportOptions: boolean;
  condition: string;
  setOptionsIncluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  setOptionsExcluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  configuredDecisions?: IConfiguredDecisions[];
}

export type { IUseDragAndDropBoxesForm };
