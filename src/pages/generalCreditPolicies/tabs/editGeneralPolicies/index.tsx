import { useContext } from "react";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { useSaveGeneralPolicies } from "@hooks/GeneralCreditPolicies/useSaveGeneralPolicies";
import { useEditGenCredPolicies } from "@hooks/GeneralCreditPolicies/edit/useEditGenCredPolicies";
import { UseCase } from "@enum/useCase";
import { IEditGeneralPolicies } from "@ptypes/generalCredPolicies/IEditGeneralPolicies";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useThemeData } from "@utils/theme";
import { EditGeneralPoliciesUI } from "./interface";

const EditGeneralPolicies = (props: IEditGeneralPolicies) => {
  const {
    contributionsData,
    incomeData,
    scoreModelsData,
    referenceData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const {
    formValues,
    decisionsGeneralRef,
    isSelected,
    saveData,
    showRequestProcessModal,
    smallScreen,
    contributionsPortfolio,
    incomePortfolio,
    scoreModels,
    filteredTabs,
    initialDecisionsGenData,
    showDecisionsGeneral,
    showIncomePort,
    showContributions,
    showScoreModels,
    showGoBackModal,
    showDateModal,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    heightContPageContribut,
    heightContPageIncome,
    heightContPageScoreModels,
    setShowReciprocity,
    setShowFactor,
    handleFinishForm,
    handleToggleDateModal,
    handleGoBack,
    handleCloseGoBackModal,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    handleReset,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  } = useEditGenCredPolicies({
    contributionsData,
    incomeData,
    scoreModelsData,
    referenceData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
  });

  const {
    saveGeneralPolicies,
    requestSteps,
    loadingSendData,
    showPendingReqModal,
    isRequestStatusModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSaveGeneralPolicies({
    useCase: UseCase.EDIT,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal: setShowModal,
  });

  const theme = useThemeData();

  return (
    <EditGeneralPoliciesUI
      formValues={formValues}
      filteredTabsConfig={Object.values(filteredTabs)}
      isSelected={isSelected}
      onTabChange={handleTabChange}
      onReset={handleReset}
      setIsCurrentFormValid={setIsCurrentFormValid}
      saveGeneralPolicies={saveGeneralPolicies as ISaveDataResponse}
      requestSteps={requestSteps}
      loading={loadingSendData}
      showPendingReqModal={showPendingReqModal}
      showRequestProcessModal={showRequestProcessModal}
      onCloseRequestStatus={handleCloseRequestStatus}
      onClosePendingReqModal={handleClosePendingReqModal}
      smallScreen={smallScreen}
      contributionsPortfolio={contributionsPortfolio}
      setContributionsPortfolio={setContributionsPortfolio}
      decisionsGeneralReference={decisionsGeneralRef}
      incomePortfolio={incomePortfolio}
      scoreModels={scoreModels}
      setIncomePortfolio={setIncomePortfolio}
      setScoreModels={setScoreModels}
      initialDecisionsData={initialDecisionsGenData}
      showDecisionsGeneral={showDecisionsGeneral}
      showIncomePort={showIncomePort}
      showContributions={showContributions}
      showScoreModels={showScoreModels}
      showGoBackModal={showGoBackModal}
      onGoBack={handleGoBack}
      onCloseGoBackModal={handleCloseGoBackModal}
      showDateModal={showDateModal}
      onFinishForm={handleFinishForm}
      onToggleDateModal={handleToggleDateModal}
      normalizedContributions={normalizedContributions}
      normalizedIncome={normalizedIncome}
      normalizedScoreModels={normalizedScoreModels}
      isRequestStatusModal={isRequestStatusModal}
      setShowReciprocity={setShowReciprocity}
      setShowFactor={setShowFactor}
      theme={theme}
      heightContPageContribut={heightContPageContribut}
      heightContPageIncome={heightContPageIncome}
      heightContPageScoreModels={heightContPageScoreModels}
      onCloseProcess={handleCloseProcess}
    />
  );
};

export { EditGeneralPolicies };
