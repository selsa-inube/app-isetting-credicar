import { IGetConfiguredDecisions } from "@ptypes/decisions/IGetConfiguredDecisions";

const mapGetConfiguredEntities = (
  data: IGetConfiguredDecisions[] | undefined,
) => {
  if (!data) return [];
  return data.map((item) => ({
    ...item,
  }));
};

export { mapGetConfiguredEntities };
