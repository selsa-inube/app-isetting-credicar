interface IRangeValue {
  from?: number;
  to?: number;
}
type ValueType = string | number | IRangeValue;

export type { IRangeValue, ValueType };
