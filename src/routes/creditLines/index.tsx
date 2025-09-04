import { Route, Routes } from "react-router-dom";

import { CreditLines } from "@pages/creditLines";

const CreditLinesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CreditLines />} />
    </Routes>
  );
};

export { CreditLinesRoutes };
