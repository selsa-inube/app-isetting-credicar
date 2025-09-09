interface IAccordion {
  title: string;
  defaultOpen?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

export type { IAccordion };
