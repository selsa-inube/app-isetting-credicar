import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildNavDropDownSequence } from "@utils/buildNavDropDownSequence";
import { IUseStepNavigation } from "@ptypes/creditLines/IUseStepNavigation";
import { TGroupLite } from "@ptypes/creditLines/TGroupLite";

function useStepNavigation({ groups }: IUseStepNavigation) {
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

  const handleBack = React.useCallback(() => {
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
  }, [currentIndex, navigate, prevIndex, sequence]);

  const handleNext = React.useCallback(() => {
    if (currentIndex < 0) {
      if (sequence[0]) navigate(sequence[0].path);
      return;
    }
    const next = nextIndex >= 0 ? sequence[nextIndex] : null;
    if (next) navigate(next.path);
  }, [currentIndex, navigate, nextIndex, sequence]);
  console.log("mi data: ", location.pathname, currentIndex, sequence);

  const disabledBack = currentIndex <= 0;
  const disabledNext = currentIndex < 0 || currentIndex >= sequence.length - 1;

  return {
    disabledBack,
    disabledNext,
    handleBack,
    handleNext,
    sequence,
    currentIndex,
  };
}

export { useStepNavigation };
