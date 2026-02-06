import { ReactNode } from "react";
import { IOption } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { EComponentAppearance } from "@enum/appearances";
import { IRulesFormTextValues } from "../IRulesFormTextValues";

interface INewDecisionsUI {
  closeModal: () => void;
  conditionEmpty: boolean;
  controls: boolean;
  dataEmpty: boolean;
  decisions: IRuleDecision[];
  decisionTemplate: IRuleDecision;
  deleteDecision: (id: string) => void;
  editionMode: "classic" | "versioned";
  iconAppearance: EComponentAppearance;
  iconMessage: ReactNode;
  isModalOpen: boolean;
  loading: boolean;
  mesaggeEmpty: string;
  message: string;
  multipleChoicesOptions: IOption[];
  cancelButton: () => void;
  disabledPrevius: boolean;
  cancelButtonLabel: string;
  disabledNext: boolean;
  onSave: () => void;
  saveButtonLabel: string;
  onMultipleChoicesChange: (name: string, values: string) => void;
  openModal: (decision?: IRuleDecision | null) => void;
  optionDetails: boolean;
  removeCondition: (conditionName: string) => void;
  selectedConditions: string;
  selectedDecision: IRuleDecision | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: (dataDecision: any) => void;
  textValues: IRulesFormTextValues;
  customMessageEmptyDecisions?: string;
  restoreConditions?: (scopedNames: string[]) => void;
}

export type { INewDecisionsUI };
