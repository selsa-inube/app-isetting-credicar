import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";
import { encrypt } from "@utils/crypto/encrypt";

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
    clientId: encrypt(String(businessManager.clientId)),
    clientSecret: encrypt(String(businessManager.clientSecret)),
  };
  return business;
};

export { mapBusinessManagerApiToEntity };
