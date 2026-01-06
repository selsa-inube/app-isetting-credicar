const getGroupName = (ind: number) => {
  if (ind === 0) {
    return "group-primary";
  }
  return `group-alternate-${ind + 1}`;
};

export { getGroupName };
