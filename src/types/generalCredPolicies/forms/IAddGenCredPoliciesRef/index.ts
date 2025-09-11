import { FormikProps } from "formik";

import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IAddGenCredPoliciesRef {
  decisionsGeneral: React.RefObject<FormikProps<IDecisionsGeneralEntry> | null>;
}

export type { IAddGenCredPoliciesRef };
