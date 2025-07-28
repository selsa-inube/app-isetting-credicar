import { useContext, useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { getNewInsertDecisions } from "@utils/getNewInsertDecisions";
import { getNewDeletedDecisions } from "@utils/getNewDeletedDecisions";
import { formatDate } from "@utils/date/formatDate";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IUseNewDecisions } from "@ptypes/hooks/IUseNewDecisions";

const useNewDecisions = (props: IUseNewDecisions) => {
  const {
    contributionsData,
    incomeData,
    scoreModelsData,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [contributionsPortfolio, setContributionsPortfolio] = useState<
    IRuleDecision[]
  >(contributionsData ?? []);
  const [incomePortfolio, setIncomePortfolio] = useState<IRuleDecision[]>([]);
  const [scoreModels, setScoreModels] = useState<IRuleDecision[]>([]);
  const [newDecisions, setNewDecisions] = useState<IRuleDecision[]>();
  const [dateDecisions, setDateDecisions] = useState<IDateVerification>();
  const [showReciprocity, setShowReciprocity] = useState(false);
  const [showFactor, setShowFactor] = useState(false);

  const dateCurrent = String(formatDate(new Date()));

  useEffect(() => {
    setDateDecisions({
      date: dateCurrent,
    });
  }, []);

  useEffect(() => {
    if (contributionsData && normalizedContributions) {
      setContributionsPortfolio(normalizedContributions);
    }
  }, [contributionsData]);

  useEffect(() => {
    if (incomeData && normalizedIncome) {
      setIncomePortfolio(normalizedIncome);
    }
  }, [incomeData]);

  useEffect(() => {
    if (scoreModelsData && normalizedScoreModels) {
      setScoreModels(normalizedScoreModels);
    }
  }, [scoreModelsData]);

  const newInsertValContribution = getNewInsertDecisions(
    appData.user.userAccount,
    prevContributionsRef,
    contributionsPortfolio,
    dateDecisions?.date,
  );

  const newInsertValIncomes = getNewInsertDecisions(
    appData.user.userAccount,
    prevIncomesRef,
    incomePortfolio,
    dateDecisions?.date,
  );

  const newInsertValScore = getNewInsertDecisions(
    appData.user.userAccount,
    prevScoreModelsRef,
    scoreModels,
    dateDecisions?.date,
  );

  const newDeleteValContribution = getNewDeletedDecisions(
    appData.user.userAccount,
    prevContributionsRef,
    contributionsPortfolio,
    dateDecisions?.date,
  );

  const newDeleteValIncomes = getNewDeletedDecisions(
    appData.user.userAccount,
    prevIncomesRef,
    incomePortfolio,
    dateDecisions?.date,
  );

  const newDeleteValScore = getNewDeletedDecisions(
    appData.user.userAccount,
    prevScoreModelsRef,
    scoreModels,
    dateDecisions?.date,
  );

  useEffect(() => {
    const insertValues = [
      newInsertValContribution,
      newInsertValIncomes,
      newInsertValScore,
    ];

    const deleteValues = [
      newDeleteValContribution,
      newDeleteValIncomes,
      newDeleteValScore,
    ];

    setNewDecisions([
      ...(insertValues as IRuleDecision[]),
      ...(deleteValues as IRuleDecision[]),
    ]);
  }, [contributionsPortfolio, incomePortfolio, scoreModels]);

  return {
    showRequestProcessModal,
    contributionsPortfolio,
    isCurrentFormValid,
    incomePortfolio,
    scoreModels,
    dateDecisions,
    newDecisions,
    showReciprocity,
    showFactor,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    normalizeEvaluateRuleData,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
  };
};

export { useNewDecisions };
