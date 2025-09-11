import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";

const mapBusinessManagerApiToEntity = (
  businessManager: Record<string, string>,
): IBusinessManagers => {
  const business: IBusinessManagers = {
    id: String(businessManager.businessManagerCode),
    publicCode: String(businessManager.publicCode),
    language: String(businessManager.languageId),
    abbreviatedName: String(businessManager.abbreviatedName),
    description: String(businessManager.descriptionUse),
    urlBrand: String(businessManager.urlBrand),
    urlLogo: String(businessManager.urlLogo),
    customerId: String(businessManager.customerId),
  };
  return business;
};

export { mapBusinessManagerApiToEntity };
