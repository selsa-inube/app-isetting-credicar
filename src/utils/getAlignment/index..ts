import { alignedColumns } from "@config/alignedColumns";

const getAlignment = (
  titleId: string,
  value: string | number | Date,
): "left" | "right" => {
  if (alignedColumns.includes(titleId)) {
    return "right";
  }
  return typeof value === "string" ? "left" : "right";
};

export { getAlignment };
