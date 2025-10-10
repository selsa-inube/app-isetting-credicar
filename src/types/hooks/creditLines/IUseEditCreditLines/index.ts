/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { RefObject } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";

interface IUseEditCreditLines {
  useCaseConfiguration: string;
  templateKey: string;
  decisionsData: IRuleDecisionExtended[];
  linesConstructionData: ILinesConstructionData;
  linesData: IModifyConstructionResponse | undefined;
  nameLineRef: RefObject<FormikProps<INameAndDescriptionEntry> | null>;
  setLinesData?: React.Dispatch<
    React.SetStateAction<IModifyConstructionResponse | undefined>
  >;
  setLinesEditData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  mergeRules: (
    existingRules?: IRuleDecision[],
    newRules?: IRuleDecision[],
  ) => IRuleDecision[];
}

export type { IUseEditCreditLines };
