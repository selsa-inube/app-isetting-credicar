import { useState } from "react";
import { IOptionClient } from "@ptypes/creditLines/forms/IOptionClient";
import { useConfigurationLines } from "../configurationLines/useConfigurationLines";

const useClientsSupportLineForm = () => {
  const {
    showInfoModal,
    updateData,
    optionsExcluded,
    optionsIncluded,
    loading,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines();

  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(
    null,
  );

  const handleClickIncluded = () => {
    const objectToMove = optionsExcluded.find(
      (option: IOptionClient) => option.id === selectedConditionId,
    );

    if (objectToMove) {
      setOptionsIncluded((prev: IOptionClient[]) => [...prev, objectToMove]);
      setOptionsExcluded((prev: IOptionClient[]) =>
        prev.filter(
          (option: IOptionClient) => option.id !== selectedConditionId,
        ),
      );
    }
    setSelectedConditionId(null);
  };

  const handleClickExcluded = () => {
    const objectToMove = optionsIncluded.find(
      (option: IOptionClient) => option.id === selectedConditionId,
    );

    if (objectToMove) {
      setOptionsExcluded((prev: IOptionClient[]) => [...prev, objectToMove]);
      setOptionsIncluded((prev: IOptionClient[]) =>
        prev.filter(
          (option: IOptionClient) => option.id !== selectedConditionId,
        ),
      );
    }

    setSelectedConditionId(null);
  };

  return {
    selectedConditionId,
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    updateData,
    handleOpenModal,
    handleToggleInfoModal,
    setSelectedConditionId,
    handleClickIncluded,
    handleClickExcluded,
  };
};

export { useClientsSupportLineForm };
