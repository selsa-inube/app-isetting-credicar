import { IServerDomain } from "@ptypes/IServerDomain";

const normalizeLaborRegulatorFramework = (
  enumData: IServerDomain[],
  value: string,
) => {
  return enumData.find((item) => item.id === value)?.label ?? value;
};

export { normalizeLaborRegulatorFramework };
