interface IRequestSteps {
  name: string;
  status: "pending" | "completed" | "error";
  statusRequest?: string;
}

export type { IRequestSteps };
