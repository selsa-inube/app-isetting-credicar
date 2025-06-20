import { useTheme } from "styled-components";

const useThemeData = () => {
  const theme = useTheme();
  return theme;
};

export { useThemeData };
