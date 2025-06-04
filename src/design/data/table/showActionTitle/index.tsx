import { Th } from "@inubekit/inubekit";
import { IShowActionTitle } from "@ptypes/design/IShowActionTitle";
import { actionsLabels } from "@config/actionsLabels";

const ShowActionTitle = (props: IShowActionTitle) => {
  const {
    numberActions,
    mediaQuery,
    actionTitle,
    title,
    withGeneralizedTitle,
  } = props;

  const withActionsTitles = mediaQuery && withGeneralizedTitle;

  const numberColumnsAction =
    mediaQuery && !withGeneralizedTitle ? 1 : numberActions;

  return !withActionsTitles && title ? (
    actionTitle.map((action) => (
      <Th key={`action-${action.id}`} action={true}>
        {action.actionName}
      </Th>
    ))
  ) : (
    <Th colSpan={numberColumnsAction} action>
      {actionsLabels.actions}
    </Th>
  );
};

export { ShowActionTitle };
