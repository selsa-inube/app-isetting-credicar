import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { ConfigurationLinesUI } from "./interface";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TLinkItem } from "@isettingkit/business-rules";

const ConfigurationLines = () => {
  const {
    loading,
    lineData,
    updateData,
    withDecisions,
    withoutDecisions,
    showDecision,
    modalData,
    showInfoModal,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines();

  const defaultOpenId = null;
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const location = useLocation();

  const collapseOnNavigate = true;

  useEffect(() => {
    if (collapseOnNavigate) setOpenId(null);
  }, [collapseOnNavigate, location.pathname]);

  const getActiveId = useCallback(
    (links: TLinkItem[]) =>
      links.find((links) => links.path === location.pathname)?.id,
    [location.pathname],
  );

  return (
    <ConfigurationLinesUI
      loading={loading}
      data={lineData}
      updateData={updateData}
      withDecisions={withDecisions}
      withoutDecisions={withoutDecisions}
      showModal={showDecision}
      modalData={modalData}
      onToggleInfoModal={handleToggleInfoModal}
      onOpenModal={handleOpenModal}
      showInfoModal={showInfoModal}
      getActiveId={getActiveId}
      openId={openId}
      setOpenId={setOpenId}
    />
  );
};
export { ConfigurationLines };
