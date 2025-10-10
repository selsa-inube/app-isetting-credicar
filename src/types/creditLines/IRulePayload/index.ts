interface IRulePayload {
  ruleName: string;
  decisionsByRule: {
    conditionGroups?: {
      ConditionGroupId?: string;
      conditionsThatEstablishesTheDecision: {
        conditionName: string;
        value: string;
      }[];
    }[];
    effectiveFrom: string;
    validUntil?: string;
    value: string;
  }[];
}

export type { IRulePayload };
