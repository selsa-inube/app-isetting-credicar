import { FormikProps } from "formik";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { IOptionsGenDecision } from "../generalCreditPolicies/IOptionsGenDecision";

interface IUseDecisionsGenForm {
  initialValues: IDecisionsGeneralEntry;
  ref: React.ForwardedRef<FormikProps<IDecisionsGeneralEntry>>;
  onSubmit: ((values: IDecisionsGeneralEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setOptionsGenDecision?: React.Dispatch<
    React.SetStateAction<IOptionsGenDecision>
  >;
  editDataOption?: boolean;
  handleFormValidChange?: (isValid: boolean) => void;
  initialValuesEdit?: IDecisionsGeneralEntry;
  setShowReciprocity?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFactor?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseDecisionsGenForm };
