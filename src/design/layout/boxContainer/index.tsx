import { EComponentAppearance } from "@enum/appearances";
import { IBoxContainer } from "@ptypes/design/IBoxContainer";
import { StyledFlex } from "./styles";

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
    backgroundColor = EComponentAppearance.LIGHT,
    boxSizing,
    borderColor = EComponentAppearance.LIGHT,
    overflowY,
    overflowX,
    boxShadow,
    minHeight,
    maxHeight,
    maxWidth,
    minWidth,
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
      $maxWidth={maxWidth}
      $minWidth={minWidth}
    >
      {children}
    </StyledFlex>
  );
};

export { BoxContainer };
