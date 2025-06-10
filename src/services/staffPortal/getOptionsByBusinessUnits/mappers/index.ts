import { IOptionsByBusinessUnits } from "@ptypes/staffPortal/IOptionsByBusinessUnits";

const mapOptionsByBusinessUnitsApiToEntity = (
  businessUnit: IOptionsByBusinessUnits,
): IOptionsByBusinessUnits => {
  const businessUnitData: IOptionsByBusinessUnits = {
    optionStaffId: String(businessUnit.optionStaffId),
    abbreviatedName: String(businessUnit.abbreviatedName),
    descriptionUse: String(businessUnit.descriptionUse),
    publicCode: String(businessUnit.publicCode),
    useCaseName: String(businessUnit.useCaseName),
  };
  return businessUnitData;
};

const mapOptionsByBusinessUnitsToEntities = (
  options: IOptionsByBusinessUnits[],
): IOptionsByBusinessUnits[] => {
  return options.map(mapOptionsByBusinessUnitsApiToEntity);
};
export {
  mapOptionsByBusinessUnitsToEntities,
  mapOptionsByBusinessUnitsApiToEntity,
};
