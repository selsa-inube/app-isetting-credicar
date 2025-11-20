import { SetStateAction } from "react";
import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";

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
  setLinesData: React.Dispatch<
    SetStateAction<IModifyConstructionResponse | undefined>
  >;
  setOptionsIncluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  setOptionsExcluded: React.Dispatch<React.SetStateAction<IDragAndDropColumn>>;
  configuredDecisions?: IConfiguredDecisions[];
}

export type { IUseDragAndDropBoxesForm };
