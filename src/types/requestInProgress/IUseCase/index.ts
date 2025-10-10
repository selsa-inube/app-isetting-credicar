const useCase = [
  "add",
  "edit",
  "delete",
  "details",
  "detailsConditional",
] as const;

type UseCase = (typeof useCase)[number];

export type { UseCase };
export { useCase };
