import {
  IStackAlignContent,
  IStackAlignItem,
  IStackDirectionAlignment,
  IStackJustifyContent,
  IStackWrapControl,
} from "@inubekit/inubekit";

interface IBoxContainer {
  children: React.ReactNode;
  boxSizing: string;
  backgroundColor?: string;
  borderColor?: string;
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
  boxShadow?: string;
  minHeight?: string;
  maxHeight?: string;
}

export type { IBoxContainer };
