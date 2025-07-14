interface IAccordion {
  title: string;
  defaultOpen?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export type { IAccordion };
