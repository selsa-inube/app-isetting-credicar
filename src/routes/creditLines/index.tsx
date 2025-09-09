import { Route, Routes } from "react-router-dom";

import { CreditLines } from "@pages/creditLines";
import { ConfigurationLines } from "@pages/creditLines/tabs/creditLinesTab/ConfigurationLines";

const CreditLinesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CreditLines />} />
      <Route path="edit-credit-lines" element={<ConfigurationLines />} />
    </Routes>
  );
};

export { CreditLinesRoutes };
