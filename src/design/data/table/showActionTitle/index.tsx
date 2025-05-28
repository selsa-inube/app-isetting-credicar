import { Th } from "@inubekit/inubekit";
import { IAction } from "../types";
import { useTranslation } from "react-i18next";

const ShowActionTitle = (
  numberActions: number,
  mediaQuery: boolean,
  actionTitle: IAction[],
  title?: boolean,
) => {
  const { t } = useTranslation();
  return title ? (
    actionTitle.map((action) => (
      <Th key={`action-${action.id}`} action={true}>
        {action.actionName}
      </Th>
    ))
  ) : (
    <Th colSpan={mediaQuery ? 1 : numberActions} action={true}>
      {t("moneyDestination.table.actions")}
    </Th>
  );
};

export { ShowActionTitle };
