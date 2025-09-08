import { IInformationEntry } from "@ptypes/creditLines/forms/IInformationEntry";

interface IFormsCreditLine {
  information: { isValid: boolean; values: IInformationEntry };
}

export type { IFormsCreditLine };
