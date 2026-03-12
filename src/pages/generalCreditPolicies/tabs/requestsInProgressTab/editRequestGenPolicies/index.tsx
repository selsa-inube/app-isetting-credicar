import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { useDataGeneralPolicies } from "@hooks/GeneralCreditPolicies/useDataGeneralPolicies";
import { ENameRules } from "@enum/nameRules";
import { mediaQueryTablet } from "@config/environment";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { EditRequestGenPoliciesUI } from "./interface";

const EditRequestGenPolicies = () => {
  const { id, option, requestNumber } = useParams();

  const { data, loading, hasError } = useDataGeneralPolicies({
    id,
    requestNumber,
    option,
  });

  const smallScreen = useMediaQuery(mediaQueryTablet);

  return (
    <EditRequestGenPoliciesUI
      option={option ?? ""}
      id={id ?? ""}
      requestNumber={requestNumber ?? ""}
      smallScreen={smallScreen}
      contributionsData={
        data?.[ENameRules.CONTRIBUTIONS_PORTFOLIO] as IRuleDecisionExtended[]
      }
      minimumIncomeData={
        data?.[ENameRules.MINIMUM_INCOME_PERCENTAGE] as IRuleDecisionExtended[]
      }
      incomeData={
        data?.[ENameRules.INCOME_PORTFOLIO] as IRuleDecisionExtended[]
      }
      scoreModelsData={
        data?.[ENameRules.SCORE_MODELS] as IRuleDecisionExtended[]
      }
      methodsData={data?.[ENameRules.METHODS] as IRuleDecisionExtended[]}
      additionalDebtorsData={
        data?.[ENameRules.ADDITIONAL_DEBTORS] as IRuleDecisionExtended[]
      }
      realGuaranteesData={
        data?.[ENameRules.REAL_GUARANTEES] as IRuleDecisionExtended[]
      }
      basicNotificFormatData={
        data?.[ENameRules.BASIC_NOTIFICATION_FORMAT] as IRuleDecisionExtended[]
      }
      basicNotificationRecData={
        data?.[
          ENameRules.BASIC_NOTIFICATION_RECIPIENT
        ] as IRuleDecisionExtended[]
      }
      creditBureausConsultReqData={
        data?.[
          ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED
        ] as IRuleDecisionExtended[]
      }
      inquiryValidityPeriodData={
        data?.[ENameRules.INQUIRY_VALIDITY_PERIOD] as IRuleDecisionExtended[]
      }
      lineCreditPayrollAdvanceData={
        data?.[
          ENameRules.LINE_CREDIT_PAYROLL_ADVANCE
        ] as IRuleDecisionExtended[]
      }
      lineCreditPayrollSpecialAdvanceData={
        data?.[
          ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE
        ] as IRuleDecisionExtended[]
      }
      maximumNotifDocSizeData={
        data?.[
          ENameRules.MAXIMUM_NOTIFICATION_DOCUMENT_SIZE
        ] as IRuleDecisionExtended[]
      }
      minCredBureauRiskScoreData={
        data?.[
          ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE
        ] as IRuleDecisionExtended[]
      }
      notifChannelData={
        data?.[ENameRules.NOTIFICATION_CHANNEL] as IRuleDecisionExtended[]
      }
      riskScoreApiUrlData={
        data?.[ENameRules.RISKSCORE_API_URL] as IRuleDecisionExtended[]
      }
      loading={loading}
      hasError={hasError}
      data={data}
    />
  );
};

export { EditRequestGenPolicies };
