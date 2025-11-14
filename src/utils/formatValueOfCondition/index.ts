import { PossibleValues } from "@ptypes/IPossibleValues";
import { IRangeValue } from "@ptypes/IRangeValue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRangeObject = (value: any) => {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    "from" in value &&
    "to" in value
  );
};

const formatValueOfCondition = (value: PossibleValues) => {
  if (value === null || value === undefined) {
    return;
  }

  if (isRangeObject(value)) {
    const { from, to } = value as IRangeValue;

    if (
      from === null ||
      from === undefined ||
      to === null ||
      to === undefined
    ) {
      return false;
    }

    return `De ${from} a ${to}`.trim();
  }

  if (typeof value === "number") {
    if (isNaN(value)) return;
    if (!isFinite(value)) return value > 0 ? "∞" : "-∞";

    return String(value);
  }

  if (typeof value === "string") {
    return value.trim() || "";
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "";
    return value.join(", ");
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[Objeto]";
    }
  }

  return "";
};

export { formatValueOfCondition };
