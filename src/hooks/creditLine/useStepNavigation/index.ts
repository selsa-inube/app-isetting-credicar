import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildNavDropDownSequence } from "@utils/buildNavDropDownSequence";
import { IUseStepNavigation } from "@ptypes/creditLines/IUseStepNavigation";
import { TGroupLite } from "@ptypes/creditLines/TGroupLite";

const useStepNavigation = (props: IUseStepNavigation) => {
  const { groups, disabledButtons, handleStep, handleSave } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const sequence = React.useMemo(
    () => buildNavDropDownSequence(groups as unknown as readonly TGroupLite[]),
    [groups],
  );

  const currentIndex = React.useMemo(
    () => sequence.findIndex((i) => i.path === location.pathname),
    [location.pathname, sequence],
  );

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;
  const nextIndex =
    currentIndex >= 0 && currentIndex < sequence.length - 1
      ? currentIndex + 1
      : -1;

  const handleBack = React.useCallback(async () => {
    const canProceed = await handleStep(true);

    if (!canProceed) {
      return;
    }
    if (currentIndex < 0) return;
    const here = sequence[currentIndex];
    const prev = prevIndex >= 0 ? sequence[prevIndex] : null;
    if (!prev) return;

    const isFirstLinkOfGroup =
      here.kind === "link" &&
      (prev.groupId !== here.groupId ||
        (prev.kind === "group" && prev.groupId === here.groupId));

    if (
      isFirstLinkOfGroup &&
      prev.kind === "group" &&
      prev.groupId === here.groupId
    ) {
      navigate(prev.path);
      return;
    }
    navigate(prev.path);
  }, [currentIndex, navigate, prevIndex, sequence, handleStep]);

  const handleNext = React.useCallback(async () => {
    const canProceed = await handleStep(true);

    if (!canProceed) {
      return;
    }

    if (currentIndex < 0) {
      if (sequence[0]) navigate(sequence[0].path);
      return;
    }
    const next = nextIndex >= 0 ? sequence[nextIndex] : null;
    if (next) navigate(next.path);
  }, [currentIndex, navigate, nextIndex, sequence, handleStep]);

  const handleClickSend = async () => {
    const canProceed = await handleSave(true);
    if (!canProceed) {
      return;
    }
  };

  const disabledBack = currentIndex <= 0 || disabledButtons;
  const disabledNext = disabledButtons || currentIndex >= sequence.length - 1;

  const disabledSend = disabledButtons;
  const loadingBackAndNext = false;
  const loadingSend = false;

  return {
    currentIndex,
    disabledBack,
    disabledNext,
    disabledSend,
    loadingBackAndNext,
    loadingSend,
    sequence,
    handleBack,
    handleClickSend,
    handleNext,
  };
};

export { useStepNavigation };
