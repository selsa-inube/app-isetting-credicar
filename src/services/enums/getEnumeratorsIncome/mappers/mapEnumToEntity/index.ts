import { IEnumerators } from "@ptypes/IEnumerators";

const mapEnumToEntity = (enumData: IEnumerators): IEnumerators => {
  const business: IEnumerators = {
    code: String(enumData.code),
    description: String(enumData.description),
    value: String(enumData.type),
  };
  return business;
};

export { mapEnumToEntity };
