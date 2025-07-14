import { useState } from "react";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { useMediaQuery } from "@inubekit/inubekit";
import { decrypt } from "@utils/crypto/decrypt";
import { mediaQueryTablet } from "@config/environment";

const useCreditLinePage = (businessUnitSigla: string) => {
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [searchCreditLines, setSearchCreditLines] = useState<string>("");

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: "",
  });

  const handleSearchCreditLines = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCreditLines(e.target.value);
  };

  const smallScreen = useMediaQuery(mediaQueryTablet);
  const widthFirstColumn = smallScreen ? 64 : 25;
  const columnWidths = [widthFirstColumn, 55];

  return {
    searchCreditLines,
    descriptionOptions,
    widthFirstColumn,
    smallScreen,
    columnWidths,
    handleSearchCreditLines,
  };
};

export { useCreditLinePage };
