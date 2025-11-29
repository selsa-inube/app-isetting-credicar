import { useGeneralCreditPolicies } from "@hooks/GeneralCreditPolicies/generalCreditPolicies/useGeneralCreditPolicies";
import { useModalGeneralCreditPolicies } from "@hooks/GeneralCreditPolicies/generalCreditPolicies/useModalGeneralCreditPolicies";
import { useEditGeneralPolicies } from "@hooks/GeneralCreditPolicies/edit/useEditGeneralPolicies";
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
    contributionsData,
    minimumIncomeData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    loadingPolicies,
    showAddPolicies,
    showrequestTab,
    loadingRequest,
    emptyData,
    withoutPrivilegesAdd,
    defaultSelectedTab,
    handleEmptyData,
    handleCloseModal,
    handlePolicies,
    handleTabChange,
  } = useGeneralCreditPolicies();

  const {
    showGoBackModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleOpenModal,
  } = useEditGeneralPolicies({
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    minimumIncomeData,
    additionalDebtorsData,
    realGuaranteesData,
  });

  const { showDecision, modalData } = useModalGeneralCreditPolicies({
    emptyData,
    withoutPrivilegesAdd,
    showAddPolicies,
    showGoBackModal,
    defaultSelectedTab,
    handleCloseGoBackModal,
    handleGoBack,
    handleEmptyData,
    handleCloseModal,
    handlePolicies,
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
      contributionsData={contributionsData}
      minimumIncomeData={minimumIncomeData}
      incomeData={incomeData}
      scoreModelsData={scoreModelsData}
      methodsData={methodsData}
      additionalDebtorsData={additionalDebtorsData}
      realGuaranteesData={realGuaranteesData}
      withoutPolicies={withoutPolicies}
      loadingPolicies={loadingPolicies ?? true}
      showAddPolicies={showAddPolicies ?? false}
      modalData={modalData}
      handleOpenModal={handleOpenModal}
      loadingRequest={loadingRequest}
      showDecision={showDecision}
    />
  );
};

export { GeneralCreditPolicies };
