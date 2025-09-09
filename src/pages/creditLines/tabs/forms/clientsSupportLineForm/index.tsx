import { useClientsSupportLineForm } from "@hooks/creditLine/useClientsSupportLineForm";
import { IClientsSupportLineForm } from "@ptypes/creditLines/forms/IClientsSupportLineForm";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = (props: IClientsSupportLineForm) => {
  const {
    optionsIncluded,
    optionsExcluded,
    setOptionsIncluded,
    setOptionsExcluded,
  } = props;

  const {
    selectedConditionId,
    setSelectedConditionId,
    handleClickIncluded,
    handleClickExcluded,
  } = useClientsSupportLineForm({
    optionsIncluded,
    optionsExcluded,
    setOptionsIncluded,
    setOptionsExcluded,
  });

  return (
    <ClientsSupportLineFormUI
      optionsExcluded={optionsExcluded}
      optionsIncluded={optionsIncluded}
      selectedConditionId={selectedConditionId}
      setSelectedConditionId={setSelectedConditionId}
      onClickIncluded={handleClickIncluded}
      onClickExcluded={handleClickExcluded}
    />
  );
};

export { ClientsSupportLineForm };
