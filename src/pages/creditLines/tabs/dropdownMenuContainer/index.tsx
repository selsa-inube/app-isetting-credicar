import {
  DropdownMenu,
  IDropdownMenuContainer,
  TLinkItem,
} from "@isettingkit/business-rules";
import React from "react";
import { useLocation } from "react-router-dom";

const DropdownMenuContainer = (props: IDropdownMenuContainer) => {
  const { collapseOnNavigate = false, defaultOpenId = null, groups } = props;

  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId);
  const location = useLocation();

  React.useEffect(() => {
    if (collapseOnNavigate) setOpenId(null);
  }, [collapseOnNavigate, location.pathname]);

  const getActiveId = React.useCallback(
    (links: TLinkItem[]) =>
      links.find((links) => links.path === location.pathname)?.id,
    [location.pathname],
  );

  return (
    <>
      {groups.map((group) => (
        <DropdownMenu
          key={group.id}
          activeId={getActiveId(group.links)}
          isOpen={openId === group.id}
          links={group.links}
          onClick={() =>
            setOpenId((prev) => (prev === group.id ? null : group.id))
          }
          title={group.title}
        />
      ))}
    </>
  );
};

export { DropdownMenuContainer };
