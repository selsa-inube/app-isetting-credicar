import { BrowserRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
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
    useCasesByStaff: [],
    language: "es",
    token: "",
  },
  businessUnitSigla: "IProcess",
  setAppData: () => {
    void 0;
  },
  setBusinessUnitSigla: () => {
    void 0;
  },
  setUseCases: () => {
    void 0;
  },
  useCases: "",
  businessUnitsToTheStaff: [],
  setBusinessUnitsToTheStaff: () => {
    void 0;
  },
};

const meta: Meta<typeof AppPage> = {
  title: "layout/appPage",
  component: AppPage,
  decorators: [
    (Story) => (
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
