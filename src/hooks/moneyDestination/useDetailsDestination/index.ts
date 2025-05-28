import { useEffect, useState } from "react";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { eventBus } from "@events/eventBus";
import { IEntry } from "@ptypes/design/table/IEntry";

const useDetailsDestination = (appData: IAppData, data: IEntry) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const { evaluateRuleData } = useEvaluateRuleByBusinessUnit(
    appData.businessUnit.publicCode,
    {
      ruleName: "LineOfCredit",
      conditions: [
        {
          condition: "MoneyDestination",
          value: data.name,
        },
      ],
    },
  );

  useEffect(() => {
    eventBus.emit("secondModalState", showModal);
  }, [showModal]);

  return { showModal, handleToggleModal, evaluateRuleData };
};
export { useDetailsDestination };
