import { II18n } from "../i18n";

interface IEnumerators {
  code: string;
  description?: string;
  value?: string;
  type?: string;
  i18n?: II18n;
  i18nValue?: II18n;
  i18nDescription?: II18n;
  icon?: React.ReactNode;
  moneyDestinationType?: string;
}

export type { IEnumerators };
