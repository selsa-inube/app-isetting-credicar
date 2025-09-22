import { useEffect, useState } from "react";
import { eventBus } from "@events/eventBus";
import { formatDateTable } from "@utils/date/formatDateTable";
import { IEntry } from "@ptypes/design/table/IEntry";

const useDetailsRequestInProgress = (data: IEntry) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizeData = {
    ...data,
    request: data.useCaseName,
    responsable: "",
    status: data.requestStatus,
    traceability: data.configurationRequestsTraceability.map(
      (traceability: IEntry) => ({
        dateExecution: formatDateTable(new Date(traceability.executionDate)),
        actionExecuted: traceability.actionExecuted,
        userWhoExecuted: traceability.userWhoExecutedAction,
        description: traceability.description,
      }),
    ),
    typeDestination: data.typeDestination,
    creditLine: data.creditLine,
  };

  useEffect(() => {
    eventBus.emit("secondModalState", showModal);
  }, [showModal]);

  return {
    showModal,
    handleToggleModal,
    normalizeData,
  };
};

export { useDetailsRequestInProgress };
