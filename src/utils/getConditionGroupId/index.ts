import { groupIdDefault } from "@config/creditLines/configuration/groupIdDefault";

const getConditionGroupId = (groupId: string) => {
  return groupIdDefault.includes(groupId) ? groupId : undefined;
};

export { getConditionGroupId };
