import { INavGuard } from "../INavGuard";

interface IOutletCtx {
  setBeforeDropdownNavigate: React.Dispatch<
    React.SetStateAction<INavGuard | undefined>
  >;
}

export type { IOutletCtx };
