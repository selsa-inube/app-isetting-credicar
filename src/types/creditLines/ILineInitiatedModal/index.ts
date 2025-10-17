interface ILineInitiatedModal {
  lineInitiatedLabels: Record<string, string>;
  onGoBack: () => void;
  onGoContinue: () => void;
}

export type { ILineInitiatedModal };
