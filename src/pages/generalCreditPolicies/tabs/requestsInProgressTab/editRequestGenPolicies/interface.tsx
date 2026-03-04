import { Breadcrumbs, Stack } from "@inubekit/inubekit";
import { EditGeneralPolicies } from "@pages/generalCreditPolicies/tabs/editGeneralPolicies";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { LoadingPage } from "@design/feedback/loadingPage";
import { crumbsEditGenCredPolicies } from "@config/generalCreditPolicies/editGeneralPolicies/navigation";
import { editRequestLabels } from "@config/generalCreditPolicies/editGeneralPolicies/editRequestLabels";
import { IEditRequestGenPoliciesUI } from "@ptypes/generalCredPolicies/IEditRequestGenPoliciesUI";

const EditRequestGenPoliciesUI = (props: IEditRequestGenPoliciesUI) => {
  const {
    option,
    id,
    requestNumber,
    smallScreen,
    loading,
    hasError,
    data,
    contributionsData,
    minimumIncomeData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    basicNotificFormatData,
    basicNotificationRecData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
  } = props;

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s300} ${tokens.spacing.s800}`
      }
    >
      <Stack
        gap={tokens.spacing.s300}
        direction="column"
        width="100%"
        height="50%"
      >
        <Stack gap={tokens.spacing.s300} direction="column" width="100%">
          <Breadcrumbs
            crumbs={crumbsEditGenCredPolicies(option, id, requestNumber)}
          />
          <Title
            title={editRequestLabels.title}
            description={editRequestLabels.description}
            sizeTitle="large"
            navigatePage="/general-credit-policies"
          />
        </Stack>
        {(!data && !hasError) || loading ? (
          <LoadingPage />
        ) : (
          <>
            <Stack gap={tokens.spacing.s300} direction="column">
              <EditGeneralPolicies
                contributionsData={contributionsData}
                incomeData={incomeData}
                scoreModelsData={scoreModelsData}
                methodsData={methodsData}
                additionalDebtorsData={additionalDebtorsData}
                realGuaranteesData={realGuaranteesData}
                minimumIncomeData={minimumIncomeData}
                basicNotificFormatData={basicNotificFormatData}
                basicNotificationRecData={basicNotificationRecData}
                creditBureausConsultReqData={creditBureausConsultReqData}
                inquiryValidityPeriodData={inquiryValidityPeriodData}
                lineCreditPayrollAdvanceData={lineCreditPayrollAdvanceData}
                lineCreditPayrollSpecialAdvanceData={
                  lineCreditPayrollSpecialAdvanceData
                }
                maximumNotifDocSizeData={maximumNotifDocSizeData}
                minCredBureauRiskScoreData={minCredBureauRiskScoreData}
                notifChannelData={notifChannelData}
                riskScoreApiUrlData={riskScoreApiUrlData}
              />
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export { EditRequestGenPoliciesUI };
