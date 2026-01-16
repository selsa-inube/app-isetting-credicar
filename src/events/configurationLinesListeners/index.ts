import { IConfigurationLinesEvents } from "@ptypes/creditLines/IConfigurationLinesEvents";
import { TAnyHandler } from "@ptypes/creditLines/TAnyHandler";

const configurationLinesListeners: Record<
  keyof IConfigurationLinesEvents,
  Set<TAnyHandler>
> = {
  configuredDecisionsUpdated: new Set(),
};

export { configurationLinesListeners };
