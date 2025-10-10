import { useContext, useEffect, useState } from "react";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { useEmptyDataMessage } from "@hooks/emptyDataMessage";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { EComponentAppearance } from "@enum/appearances";
import { errorModal } from "@config/errorModal";
import { creditTabLabels } from "@config/creditLines/creditLinesTab/generic/creditTabLabels";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useLineInconstructionData } from "../useLineInconstructionData";

const useLineInConstructionTab = () => {
  const [showDecision, setShowDecision] = useState<boolean>(false);
  const [searchLineInConstruction, setSearchLineInConstruction] =
    useState<string>("");
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");

  const {
    lineUnderConstruction,
    setlineUnderConstruction,
    setHasError,
    loading,
    hasError,
    errorData,
  } = useLineInconstructionData();

  const { setLinesConstructionData } = useContext(CreditLinesConstruction);

  useEffect(() => {
    setLinesConstructionData({
      settingRequestId: "",
      abbreviatedName: "",
      alias: "",
      descriptionUse: "",
      lineOfCreditId: "",
      rules: [],
    });
  }, []);

  useEffect(() => {
    if (entryDeleted) {
      setlineUnderConstruction((prev) =>
        prev.filter((entry) => entry.settingRequestId !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
  };

  const handleSearchLineInConstruction = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchLineInConstruction(e.target.value);
  };

  useEffect(() => {
    setShowDecision(hasError);
  }, [hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  const emptyDataMessage = useEmptyDataMessage({
    loading: loading,
    errorData,
    data: lineUnderConstruction as Omit<IEntry[], "id">,
    smallScreen: false,
    message: creditTabLabels,
  });

  const widthFirstColumn = 80;
  const columnWidths = [widthFirstColumn];

  return {
    lineUnderConstruction,
    loading,
    hasError,
    columnWidths,
    emptyDataMessage,
    modalData,
    showDecision,
    searchLineInConstruction,
    handleSearchLineInConstruction,
    setEntryDeleted,
  };
};

export { useLineInConstructionTab };
