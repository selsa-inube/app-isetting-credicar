import { useState } from "react";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { decrypt } from "@utils/crypto/decrypt";

const useCreditLinePage = (businessUnitSigla: string) => {
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [searchCreditLines, setSearchCreditLines] = useState<string>("");

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: "Lineas de credito",
  });

  const handleSearchCreditLines = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCreditLines(e.target.value);
  };

  return {
    searchCreditLines,
    descriptionOptions,
    handleSearchCreditLines,
  };
};

export { useCreditLinePage };
