/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRangeValue } from "../IRangeValue";

type PossibleValues =
  | IRangeValue
  | number
  | string
  | boolean
  | null
  | undefined
  // eslint-disable-next-line @typescript-eslint/array-type
  | Array<any>
  | Date
  | Record<string, any>;

export type { PossibleValues };
