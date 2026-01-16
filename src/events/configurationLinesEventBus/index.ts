import { IConfigurationLinesEvents } from "@ptypes/creditLines/IConfigurationLinesEvents";
import { TAnyHandler } from "@ptypes/creditLines/TAnyHandler";
import { configurationLinesListeners } from "../configurationLinesListeners";

const configurationLinesEventBus = {
  on(event: keyof IConfigurationLinesEvents, handler: TAnyHandler) {
    configurationLinesListeners[event].add(handler);
  },
  off(event: keyof IConfigurationLinesEvents, handler: TAnyHandler) {
    configurationLinesListeners[event].delete(handler);
  },
  emit<E extends keyof IConfigurationLinesEvents>(
    event: E,
    payload: IConfigurationLinesEvents[E],
  ) {
    configurationLinesListeners[event].forEach((handler) => {
      handler(payload);
    });
  },
};

export { configurationLinesEventBus };
