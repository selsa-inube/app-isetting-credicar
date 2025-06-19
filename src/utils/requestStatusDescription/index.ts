import { IEnumerators } from "@ptypes/IEnumerators";

const requestStatusDescription = (enums: IEnumerators[], value: string) => {
  const enumFiltered = enums.find(
    (enumerator) => enumerator.code === value,
  )?.description;
  return enumFiltered ? enumFiltered : value;
};

export { requestStatusDescription };
