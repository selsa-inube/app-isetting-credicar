const getGroupNameInitial = (ind: number, group?: string) => {
  if (ind === 0) {
    return "group-primary";
  }
  return group;
};

export { getGroupNameInitial };
