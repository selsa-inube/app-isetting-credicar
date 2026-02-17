import { ValueType } from "@ptypes/generalCredPolicies/forms/IRangeValue";

const formatValueObjectfCondition = (value: ValueType): string | number => {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "object" && ("from" in value || "to" in value)) {
    const parts: string[] = [];

    if (value.from !== undefined && value.from !== null) {
      parts.push(`De ${value.from}`);
    }

    if (value.to !== undefined && value.to !== null) {
      parts.push(`A ${value.to}`);
    }

    return parts.length > 0 ? parts.join(" ") : "";
  }

  return "";
};

export { formatValueObjectfCondition };
