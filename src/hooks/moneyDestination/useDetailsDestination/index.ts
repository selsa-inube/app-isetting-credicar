import { useEffect, useState } from "react";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { eventBus } from "@events/eventBus";
import { EMoneyDestination } from "@enum/moneyDestination";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { IEntry } from "@ptypes/design/table/IEntry";

const useDetailsDestination = (appData: IAppData, data: IEntry) => {
  const [showModal, setShowModal] = useState(false);
  const [dataDetails, setDataDetails] = useState<IEntry>({} as IEntry);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const { evaluateRuleData } = useEvaluateRuleByBusinessUnit({
    businessUnits: appData.businessUnit.publicCode,
    rulesData: {
      ruleName: EMoneyDestination.LINE_OF_CREDIT,
      conditions: [
        {
          condition: "MoneyDestination",
          value: data.name,
        },
      ],
    },
    language: appData.language,
  });

  useEffect(() => {
    if (evaluateRuleData && evaluateRuleData?.length > 0) {
      const dataEvaluate = evaluateRuleData
        .map((item) => {
          return item.value;
        })
        .join(",");

      const normalizeData = {
        ...data,
        creditLine: dataEvaluate,
      };
      setDataDetails(normalizeData);
    } else {
      setDataDetails(data);
    }
  }, [evaluateRuleData]);

  useEffect(() => {
    eventBus.emit("secondModalState", showModal);
  }, [showModal]);

  return { showModal, handleToggleModal, dataDetails };
};
export { useDetailsDestination };
