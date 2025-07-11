import { StyledFlex } from "./styles";
import { IBoxContainer } from "@ptypes/design/IBoxContainer";

const BoxContainer = (props: IBoxContainer) => {
  const {
    children,
    wrap,
    direction,
    justifyContent,
    alignItems,
    alignContent,
    height,
    width,
    borderRadius,
    gap,
    margin = "0px",
    padding = "0px",
    backgroundColor = "light",
    boxSizing,
    borderColor = "light",
    overflowY,
    overflowX,
    boxShadow,
    minHeight,
    maxHeight,
  } = props;

  return (
    <StyledFlex
      $direction={direction}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $alignContent={alignContent}
      $height={height}
      $width={width}
      $wrap={wrap}
      $gap={gap}
      $margin={margin}
      $padding={padding}
      $backgroundColor={backgroundColor}
      $boxSizing={boxSizing}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $overflowY={overflowY}
      $overflowX={overflowX}
      $boxShadow={boxShadow}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
    >
      {children}
    </StyledFlex>
  );
};

export { BoxContainer };
