import { notPoliciesModal } from "@config/generalCreditPolicies/assisted/goBackModal";
import { DecisionModal } from "@design/modals/decisionModal";
import { AddGenCreditPolicies } from "./addGeneralCreditPolicies";
import { Breadcrumbs, Spinner, Stack, Tabs, Text } from "@inubekit/inubekit";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { crumbsGeneralpolicies } from "@config/generalCreditPolicies/navigation";
import { loadingLabels } from "@config/loadingLabels";
import { IGeneralCreditPoliciesUI } from "@ptypes/generalCredPolicies/IGeneralCreditPoliciesUI";
import { EditGeneralPolicies } from "./tabs/editGeneralPolicies";
import { RequestsInProgressTab } from "./tabs/requestsInProgressTab";
import { descriptionTitle } from "@config/generalCreditPolicies/descriptionTitle";

const GeneralCreditPoliciesUI = (props: IGeneralCreditPoliciesUI) => {
  const {
    policiesTabs,
    descriptionOptions,
    isSelected,
    showPoliciesTab,
    showrequestTab,
    smallScreen,
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
    onTabChange,
    onCloseModal,
    onPolicies,
  } = props;

  return (
    <>
      {loadingPolicies ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="column"
          width="100%"
          height="100%"
          gap={tokens.spacing.s200}
        >
          <Spinner size="large" />
          <Text type="title" size="medium" textAlign="center">
            {loadingLabels.loading}
          </Text>
        </Stack>
      ) : (
        <>
          {showAddPolicies ? (
            <>
              <AddGenCreditPolicies />
              <DecisionModal
                portalId="portal"
                title={notPoliciesModal.title}
                description={notPoliciesModal.description}
                actionText={notPoliciesModal.actionText}
                onCloseModal={onCloseModal}
                onClick={onPolicies}
              />
            </>
          ) : (
            <Stack
              direction="column"
              width="-webkit-fill-available"
              padding={
                smallScreen
                  ? `${tokens.spacing.s200}`
                  : `${tokens.spacing.s400} ${tokens.spacing.s800}`
              }
            >
              <Stack
                gap={smallScreen ? tokens.spacing.s200 : tokens.spacing.s300}
                direction="column"
              >
                <Stack gap={tokens.spacing.s300} direction="column">
                  <Breadcrumbs crumbs={crumbsGeneralpolicies} />
                  <Title
                    title={descriptionOptions?.publicCode ?? ""}
                    description={descriptionTitle}
                    sizeTitle="large"
                    navigatePage="/"
                  />
                </Stack>
                <Stack
                  gap={tokens.spacing.s300}
                  direction="column"
                  width="100%"
                >
                  <Tabs
                    tabs={policiesTabs}
                    selectedTab={isSelected}
                    onChange={onTabChange}
                  />

                  {showPoliciesTab && (
                    <EditGeneralPolicies
                      referenceData={referenceData}
                      contributionsData={contributionsData}
                      incomeData={incomeData}
                      scoreModelsData={scoreModelsData}
                      methodsData={methodsData}
                      additionalDebtorsData={additionalDebtorsData}
                      sourcesIncomeData={sourcesIncomeData}
                      financialObligData={financialObligData}
                      realGuaranteesData={realGuaranteesData}
                    />
                  )}
                  {showrequestTab && <RequestsInProgressTab />}
                </Stack>
              </Stack>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export { GeneralCreditPoliciesUI };
