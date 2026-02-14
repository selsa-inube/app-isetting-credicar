import { IOptionsGenDecision } from "@ptypes/hooks/generalCreditPolicies/IOptionsGenDecision";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IDecisionsGeneralForm {
  initialValues: IDecisionsGeneralEntry;
  handleNextStep: () => void;
  setOptionsGenDecision?: React.Dispatch<
    React.SetStateAction<IOptionsGenDecision>
  >;
  editDataOption?: boolean;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDecisionsGeneralEntry) => void;
  handleFormValidChange?: (isValid: boolean) => void;
  onReset?: () => void;
  initialValuesEdit?: IDecisionsGeneralEntry;
  setShowReciprocity?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFactor?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IDecisionsGeneralForm };
