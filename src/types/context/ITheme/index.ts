import { inube } from "@inubekit/inubekit";
import { sistemasenlinea } from "@design/tokens/tokensWithReference/sistemasEnlinea";

type ITheme = typeof inube & Omit<typeof sistemasenlinea, keyof typeof inube>;

export type { ITheme };
