import { Route, Routes } from "react-router-dom";
import { MoneyDestination } from "@pages/moneyDestination";
import { AddDestination } from "@pages/moneyDestination/tabs/moneyDestinationTab/addDestination";
import { EditDestination } from "@pages/moneyDestination/tabs/moneyDestinationTab/editDestination";

function MoneyDestinationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MoneyDestination />} />
      <Route path="add-destination" element={<AddDestination />} />
      <Route
        path="edit-destination/:option/:id/:requestNumber"
        element={<EditDestination />}
      />
      <Route path="edit-destination/:option" element={<EditDestination />} />
    </Routes>
  );
}

export { MoneyDestinationRoutes };
