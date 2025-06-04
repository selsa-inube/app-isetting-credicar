import { spanishToEnglishDays } from "@config/spanishToEnglishDays";

const checkDayWeek = (day: string) => {
  return Object.keys(spanishToEnglishDays).includes(day)
    ? spanishToEnglishDays[day as keyof typeof spanishToEnglishDays]
    : day;
};

export { checkDayWeek };
