import "styled-components";
import { ITheme } from "@ptypes/context/ITheme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ITheme {}
}
