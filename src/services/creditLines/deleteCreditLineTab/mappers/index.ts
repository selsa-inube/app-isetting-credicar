import { IRequestCreditLine } from "@ptypes/creditLines/IRequestCreditLine";

const mapDeleteCreditEntityToApi = (
  data: IRequestCreditLine,
): IRequestCreditLine => {
  return {
    abbreviatedName: data.abbreviatedName,
    lineOfCreditId: data.lineOfCreditId,
    removalJustification: data.removalJustification,
    settingRequest: data.settingRequest,
  };
};

export { mapDeleteCreditEntityToApi };
