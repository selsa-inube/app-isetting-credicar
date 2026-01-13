import { IOptionsByStaffPortalBusinessManager } from "@ptypes/staffPortal/IOptionsByStaffPortalBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";

const mapStaffPortalByBusinessManagerApiToEntity = (
  resend: Record<
    string,
    string | IOptionsByStaffPortalBusinessManager[] | undefined
  >,
): IStaffPortalByBusinessManager => {
  const buildResend: IStaffPortalByBusinessManager = {
    abbreviatedName: String(resend.abbreviatedName),
    businessManagerCode: String(resend.businessManagerCode),
    businessManagerName: String(resend.businessManagerName),
    clientId: String(resend.clientId),
    descriptionUse: String(resend.descriptionUse),
    publicCode: String(resend.publicCode),
    staffPortalCatalogCode: String(resend.staffPortalCatalogCode),
    staffPortalId: String(resend.staffPortalId),
    url: String(resend.url),
    brandImageUrl: String(resend.brandImageUrl),
  };
  return buildResend;
};

const mapStaffPortalByBusinessManagerApiToEntities = (
  resend: Record<
    string,
    string | IOptionsByStaffPortalBusinessManager[] | undefined
  >[],
): IStaffPortalByBusinessManager[] => {
  return resend.map(mapStaffPortalByBusinessManagerApiToEntity);
};
export {
  mapStaffPortalByBusinessManagerApiToEntities,
  mapStaffPortalByBusinessManagerApiToEntity,
};
