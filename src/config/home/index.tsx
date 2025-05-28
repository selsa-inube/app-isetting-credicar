import "@i18n";
import { t } from "i18next";

const homeConfig = (username?: string) => ({
  title: t("home.titlePage", { username }),
  description: t("home.descriptionPage"),
});
export { homeConfig };
