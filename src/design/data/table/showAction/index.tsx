import { Td } from "@inubekit/inubekit";
import { ActionMobile } from "@design/data/table/actionMobile";
import { IShowAction } from "@ptypes/design/IShowAction";

const ShowAction = (props: IShowAction) => {
  const { actionContent, entry, mediaQuery, withActionMobile } = props;
  return mediaQuery && withActionMobile ? (
    <>
      <Td type="custom" align="center">
        <ActionMobile actions={actionContent} entry={entry} />
      </Td>
    </>
  ) : (
    <>
      {actionContent.map((action) => (
        <Td type="custom" align="center" key={`${entry.id}-${action.id}`}>
          {action.content(entry)}
        </Td>
      ))}
    </>
  );
};

export { ShowAction };
