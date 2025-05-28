import { Th } from "@inubekit/inubekit";
import { IShowActionTitle } from "@ptypes/design/IShowActionTitle";
import { useTranslation } from "react-i18next";

const ShowActionTitle = (props: IShowActionTitle) => {
  const { numberActions, mediaQuery, actionTitle, title } = props;
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
