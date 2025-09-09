interface IConditionBox {
  id: string;
  description: string;
  isSelected: boolean;
  onclick: (id: string) => void;
}

export type { IConditionBox };
