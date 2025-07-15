import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { mapRequestsInProgressToEntity } from "../mapRequestsToEntity";

const mapRequestsInProgressToEntities = (
  data: IRequestsInProgress[],
): IRequestsInProgress[] => {
  return data.map(mapRequestsInProgressToEntity);
};

export { mapRequestsInProgressToEntities };
