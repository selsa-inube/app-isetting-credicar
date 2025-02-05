import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import selsaLogo from "@assets/images/selsa.png";
import { AppPage } from ".";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";

const usersMock = {
  firstName: "David",
  firstLastName: "Garzon",
};

const { firstName, firstLastName } = usersMock;

const useContext = {
  appData: {
    portal: {
      abbreviatedName: "",
      staffPortalCatalogId: "",
      businessManagerId: "",
      publicCode: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
    user: {
      userAccount: `${firstName + " " + firstLastName}`,
      userName: "abc123",
    },
    businessUnit: {
      publicCode: "IProcess",
      abbreviatedName: "IProcess",
      businessUnit: "IProcess",
      languageId: "es",
      urlLogo: selsaLogo,
    },
  },
  businessUnitSigla: "IProcess",
  setAppData: () => {
    console.log("");
  },
  setBusinessUnitSigla: () => {
    console.log("");
  },
  businessUnitsToTheStaff: [],
  setBusinessUnitsToTheStaff: () => {
    console.log("");
  },
};

const meta: Meta<typeof AppPage> = {
  title: "layout/appPage",
  component: AppPage,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <AuthAndPortalData.Provider value={useContext}>
          <Story />
        </AuthAndPortalData.Provider>
      </BrowserRouter>
    ),
  ],
};

export const Default = () => <AppPage />;

export default meta;
