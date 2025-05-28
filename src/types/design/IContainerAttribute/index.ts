import { IAttribute } from "../IAttribute";

interface IContainerAttribute {
  withTag: boolean;
  children: React.ReactNode;
  isMobile: boolean;
  direction: "row" | "column" | undefined;
  value: string | number | IAttribute[] | undefined;
}

export type { IContainerAttribute };
