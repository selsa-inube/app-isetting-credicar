import { IRuleDecision } from "@isettingkit/input";

interface IUseBusinessRulesNew {
  isModalOpen: boolean;
  selectedDecision: IRuleDecision | null;
  decisions: IRuleDecision[];
  selectedConditionsCSV: string;
  removedConditionNames: Set<string>;
  localizedTemplate: IRuleDecision;
  filteredDecisionTemplate: IRuleDecision;
  multipleChoicesOptions: { id: string; label: string; value: string }[];
  decisionsSorted: IRuleDecision[];
  setSelectedDecision: (d: IRuleDecision | null) => void;
  openModal: (decision?: IRuleDecision | null) => void;
  closeModal: () => void;
  deleteDecision: (id: string) => void;
  submitForm: (dataDecision: unknown) => void;
  onMultipleChoicesChange: (name: string, valueCSV: string) => void;
  removeCondition: (conditionName: string) => void;
  restoreConditions: (names: string[]) => void;
}

export type { IUseBusinessRulesNew };
