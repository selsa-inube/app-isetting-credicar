import { useCallback, useState } from "react";
import { EBooleanText } from "@enum/booleanText";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { ISide } from "@ptypes/ISide";
import { useConfigurationLines } from "../configurationLines/useConfigurationLines";

const useClientsSupportLineForm = () => {
  const {
    showInfoModal,
    isUpdated,
    optionsExcluded,
    optionsIncluded,
    loading,
    nav,
    lineNameDecision,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({});

  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(
    null,
  );

  const targetInsertMode = EBooleanText.PREPEND;

  const removeFrom = useCallback((options: string[], item: string) => {
    const IndexOptions = options.indexOf(item);
    if (IndexOptions === -1) return options;
    const copyOptions = options.slice();
    copyOptions.splice(IndexOptions, 1);
    return copyOptions;
  }, []);

  const insertInto = useCallback(
    (options: string[], item: string) => {
      if (targetInsertMode === EBooleanText.PREPEND) return [item, ...options];
      return [...options, item];
    },
    [targetInsertMode],
  );

  const handleMove = useCallback(
    (payload: { item: string; from: ISide; to: ISide }) => {
      const { item, from, to } = payload;

      if (from === EBooleanText.LEFT && to === EBooleanText.RIGHT) {
        setOptionsExcluded((prev) => ({
          ...prev,
          items: removeFrom(prev.items, item),
        }));
        setOptionsIncluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
      } else if (from === EBooleanText.RIGHT && to === EBooleanText.LEFT) {
        setOptionsExcluded((prev) => ({
          ...prev,
          items: insertInto(prev.items, item),
        }));
        setOptionsIncluded((prev) => ({
          ...prev,
          items: removeFrom(prev.items, item),
        }));
      }
    },
    [insertInto, removeFrom],
  );

  const information = infoRulesMessage();

  const message = String(
    information["clientsSupported" as keyof typeof information] ||
      information.Default,
  );

  return {
    selectedConditionId,
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    isUpdated,
    nav,
    lineNameDecision,
    message,
    handleMove,
    handleOpenModal,
    handleToggleInfoModal,
    setSelectedConditionId,
  };
};

export { useClientsSupportLineForm };
