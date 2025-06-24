import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapRequestsInProgressToEntity } from "../mapRequestsToEntity";

const mapRequestsInProgressToEntities = (
  data: IRequestsInProgress[],
  enumsRequests?: IEnumerators[],
): IRequestsInProgress[] => {
  return data.map((item) => mapRequestsInProgressToEntity(item, enumsRequests));
};

export { mapRequestsInProgressToEntities };
