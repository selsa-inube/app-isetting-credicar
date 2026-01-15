import { Meta } from "@storybook/react";
import { Stack } from "@inubekit/inubekit";

import { businessUnitDataMock } from "@mocks/businessUnits/businessUnits.mock";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { BusinessUnitChange } from ".";

const meta: Meta<typeof BusinessUnitChange> = {
  title: "inputs/BusinessUnitChange",
  component: BusinessUnitChange,
};

const defaultContextValue = {
  appData: {
    businessUnit: {
      publicCode: "defaultCode",
      abbreviatedName: "defaultName",
      languageId: "es",
      urlLogo: "defaultUrlLogo",
    },
    portal: {
      abbreviatedName: "",
      staffPortalCatalogCode: "",
      businessManagerCode: "",
      publicCode: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
    user: {
      userAccount: "Angie Pinilla",
      userName: "Angie Pinilla",
    },
    useCasesByStaff: [],
    language: "es",
    token: "",
  },
  setBusinessUnitSigla: () => {
    void 0;
  },
  setUseCases: () => {
    void 0;
  },
  businessUnitSigla: "",
  useCases: "",
  businessUnitsToTheStaff: [],
  setAppData: () => void 0,

  setBusinessUnitsToTheStaff: () => void 0,
};

const Default = () => {
  return (
    <AuthAndPortalData.Provider value={defaultContextValue}>
      <Stack width="100px">
        <BusinessUnitChange
          businessUnits={businessUnitDataMock}
          selectedClient={"Cooservunal"}
          onLogoClick={() => void 0}
        />
      </Stack>
    </AuthAndPortalData.Provider>
  );
};

export { Default };
export default meta;
