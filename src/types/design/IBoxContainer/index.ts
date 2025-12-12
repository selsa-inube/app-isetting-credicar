import {
  IStackAlignContent,
  IStackAlignItem,
  IStackDirectionAlignment,
  IStackJustifyContent,
  IStackWrapControl,
} from "@inubekit/inubekit";
import { IAppearenceBoxContainer } from "@ptypes/IAppearenceBoxContainer";

interface IBoxContainer {
  children: React.ReactNode;
  boxSizing: string;
  borderColor?: IAppearenceBoxContainer;
  backgroundColor?: IAppearenceBoxContainer;
  borderRadius?: string;
  wrap?: IStackWrapControl;
  direction?: IStackDirectionAlignment;
  justifyContent?: IStackJustifyContent;
  alignItems?: IStackAlignItem;
  alignContent?: IStackAlignContent;
  height?: string;
  width?: string;
  gap?: string;
  margin?: string;
  padding?: string;
  overflowY?: string;
  overflowX?: string;
  boxShadow?: IAppearenceBoxContainer;
  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  minWidth?: string;
}

export type { IBoxContainer };
