const useCase = ["add", "edit", "delete"] as const;

type UseCase = (typeof useCase)[number];

export type { UseCase };
export { useCase };
