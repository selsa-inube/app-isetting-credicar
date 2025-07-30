import { useGeneralCreditPolicies } from "@hooks/GeneralCreditPolicies/useGeneralCreditPolicies";
import { useEditGenCredPolicies } from "@hooks/GeneralCreditPolicies/edit/useEditGenCredPolicies";
import { ICardData } from "@ptypes/home/ICardData";
import { GeneralCreditPoliciesUI } from "./interface";

const GeneralCreditPolicies = () => {
  const {
    withoutPolicies,
    isSelected,
    descriptionOptions,
    smallScreen,
    smallScreenTab,
    showPoliciesTab,
    policiesTabs,
    referenceData,
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
    loadingPolicies,
    showAddPolicies,
    showrequestTab,
    modalData,
    handleTabChange,
  } = useGeneralCreditPolicies();

  const {
    showGoBackModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleOpenModal,
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

  return (
    <GeneralCreditPoliciesUI
      policiesTabs={policiesTabs}
      descriptionOptions={descriptionOptions as ICardData}
      isSelected={isSelected}
      onTabChange={handleTabChange}
      smallScreenTab={smallScreenTab}
      showPoliciesTab={showPoliciesTab}
      showrequestTab={showrequestTab}
      smallScreen={smallScreen}
      referenceData={referenceData}
      contributionsData={contributionsData}
      incomeData={incomeData}
      scoreModelsData={scoreModelsData}
      methodsData={methodsData}
      additionalDebtorsData={additionalDebtorsData}
      sourcesIncomeData={sourcesIncomeData}
      financialObligData={financialObligData}
      realGuaranteesData={realGuaranteesData}
      withoutPolicies={withoutPolicies}
      loadingPolicies={loadingPolicies ?? true}
      showAddPolicies={showAddPolicies ?? false}
      modalData={modalData}
      handleOpenModal={handleOpenModal}
      showGoBackModal={showGoBackModal}
      onCloseGoBackModal={handleCloseGoBackModal}
      onGoBack={handleGoBack}
    />
  );
};

export { GeneralCreditPolicies };
