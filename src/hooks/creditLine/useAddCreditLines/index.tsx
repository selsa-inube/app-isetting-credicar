import { useContext, useRef, useState } from "react";
import { FormikProps } from "formik";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { postAddRequestInConstruction } from "@services/requestInProgress/postAddRequestInConstruction";
import { EComponentAppearance } from "@enum/appearances";
import { errorObject } from "@utils/errorObject";
import { formatDate } from "@utils/date/formatDate";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorModal } from "@config/errorModal";
import { addCreditLinesLabels } from "@config/creditLines/creditLinesTab/generic/addCreditLinesLabels";
import { IErrors } from "@ptypes/IErrors";
import { IInformationEntry } from "@ptypes/creditLines/forms/IInformationEntry";
import { IFormsCreditLine } from "@ptypes/creditLines/forms/IFormsCreditLine";
import { IUseAddCreditlines } from "@ptypes/hooks/creditLines/IUseAddCreditlines";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { ECreditLines } from "@src/enum/creditLines";

const useAddCreditlines = (props: IUseAddCreditlines) => {
  const { setShowAddModal, setShowUnderConstruction } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const { setChangeTab } = useContext(ChangeToRequestTab);
  const [saveLine, setSaveLine] = useState<ISaveDataResponse>();
  const [hasError, setHasError] = useState<boolean>(false);
  const [showLineInitiatedModal, setShowLineInitiatedModal] =
    useState<boolean>(false);
  const [formValues] = useState<IFormsCreditLine>({
    information: {
      isValid: false,
      values: {
        nameLine: "",
        aliasLine: "",
        descriptionLine: "",
      },
    },
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const generalInformationRef = useRef<FormikProps<IInformationEntry>>(null);

  const fetchSaveData = async (data: ISaveDataRequest) => {
    setLoading(true);
    try {
      const result = await postAddRequestInConstruction(
        appData.user.userAccount,
        data,
      );
      setSaveLine(result);
      setShowLineInitiatedModal(!showLineInitiatedModal);
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAddModal = () => {
    const currentValues =
      generalInformationRef.current?.values || ({} as IInformationEntry);

    const updatedFormValues = {
      ...formValues,
      information: {
        ...formValues.information,
        values: currentValues,
        isValid: generalInformationRef.current?.isValid || false,
      },
    };

    const data = {
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: addCreditLinesLabels.descriptionSaveData,
      entityName: "CreditLines",
      requestDate: formatDate(new Date()),
      useCaseName: ECreditLines.USE_CASE_ADD,
      configurationRequestData: {
        abbreviatedName: updatedFormValues.information.values.nameLine,
        alias: updatedFormValues.information.values.aliasLine,
        descriptionUse: updatedFormValues.information.values.descriptionLine,
      },
    };

    fetchSaveData(data);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    if (hasError) {
      setShowAddModal(false);
    }
  };

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
        ...errorModal(messageErrorStatusRequest(errorData.status)),
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

  const handleGoBack = () => {
    setShowLineInitiatedModal(!showLineInitiatedModal);
    setShowAddModal(false);
    setChangeTab(true);
    setShowUnderConstruction(true);
  };

  const handleGoContinue = () => {
    setShowLineInitiatedModal(!showLineInitiatedModal);
    setShowAddModal(false);
  };

  return {
    formValues,
    isCurrentFormValid,
    generalInformationRef,
    loading,
    errorData,
    hasError,
    saveLine,
    modalData,
    showLineInitiatedModal,
    handleGoBack,
    handleGoContinue,
    handleAddModal,
    handleCloseModal,
    setIsCurrentFormValid,
  };
};

export { useAddCreditlines };
