import { useState } from "react";
import { IOptionClient } from "@ptypes/creditLines/forms/IOptionClient";
import { IUseClientsSupportLineForm } from "@ptypes/hooks/creditLines/IUseClientsSupportLineForm";

const useClientsSupportLineForm = (props: IUseClientsSupportLineForm) => {
  const {
    optionsIncluded,
    optionsExcluded,
    setOptionsIncluded,
    setOptionsExcluded,
  } = props;

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
    setSelectedConditionId,
    handleClickIncluded,
    handleClickExcluded,
  };
};

export { useClientsSupportLineForm };
