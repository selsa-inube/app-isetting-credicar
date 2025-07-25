import { useGeneralCreditPolicies } from "@hooks/GeneralCreditPolicies/useGeneralCreditPolicies";
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
    withoutPrivilegesAdd,
    handleTabChange,
    handleCloseModal,
    handlePolicies,
  } = useGeneralCreditPolicies();

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
      onCloseModal={handleCloseModal}
      onPolicies={handlePolicies}
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
      withoutPrivilegesAdd={withoutPrivilegesAdd}
    />
  );
};

export { GeneralCreditPolicies };
