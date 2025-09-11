interface IConfigurationRequestsTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  settingRequestId: string;
  traceabilityId: string;
  userWhoExecutedAction?: string;
  executorUserName?: string;
  executordUser?: string;
}

export type { IConfigurationRequestsTraceability };
