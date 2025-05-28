import { IRenderLogo } from "@ptypes/design/IRenderLogo";
import { StyledContentImg, StyledLogo } from "./styles";

const RenderLogo = (props: IRenderLogo) => {
  const { imgUrl } = props;
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

export { RenderLogo };
