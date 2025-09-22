import { useHome } from "@hooks/useHome";
import { ICardData } from "@ptypes/home/ICardData";
import { HomeUI } from "./interface";

const Home = () => {
  const {
    businessUnitChangeRef,
    businessUnitsToTheStaff,
    collapse,
    collapseMenuRef,
    selectedClient,
    optionsCards,
    loading,
    appData,
    username,
    screenMobile,
    screenTablet,
    screenTabletHeader,
    hasMultipleBusinessUnits,
    dataExists,
    optionsHeader,
    padding,
    handlelogout,
    setCollapse,
    handleLogoClick,
  } = useHome();

  return (
    <HomeUI
      appData={appData}
      businessUnitChangeRef={businessUnitChangeRef}
      businessUnitsToTheStaff={businessUnitsToTheStaff}
      collapse={collapse}
      collapseMenuRef={collapseMenuRef}
      data={optionsCards as ICardData[]}
      selectedClient={selectedClient}
      setCollapse={setCollapse}
      handleLogoClick={handleLogoClick}
      loading={loading}
      username={username}
      screenMobile={screenMobile}
      screenTablet={screenTablet}
      screenTabletHeader={screenTabletHeader}
      hasMultipleBusinessUnits={hasMultipleBusinessUnits}
      dataExists={dataExists}
      optionsHeader={optionsHeader}
      onlogout={handlelogout}
      padding={padding}
    />
  );
};

export { Home };
