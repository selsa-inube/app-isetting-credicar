import { Icon } from "@inubekit/inubekit";
import { MdOutlineCreate } from "react-icons/md";
import { ComponentAppearance } from "@enum/appearances";
import { IAction, IEntry, ITitle } from "@design/data/table/types";
import { Details } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/details";
import { Delete } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/delete";

const titles: ITitle[] = [
  {
    id: "abbreviatedName",
    titleName: "Nombre de nómina",
    priority: 0,
  },
];

const actionsConfig = (setEntryDeleted: (id: string | number) => void) => {
  const actions: IAction[] = [
    {
      id: "Details",
      content: (entry: IEntry) => <Details data={entry} />,
    },
    {
      id: "edit",
      content: () => (
        <Icon
          icon={<MdOutlineCreate />}
          appearance={ComponentAppearance.PRIMARY}
          size="16px"
        />
      ),
    },
    {
      id: "delete",
      content: (entry: IEntry) => (
        <Delete data={entry} setEntryDeleted={setEntryDeleted} />
      ),
    },
  ];

  return actions;
};

const breakPoints = [
  { breakpoint: "(min-width: 745px)", totalColumns: 2 },
  { breakpoint: "(max-width: 744px)", totalColumns: 1 },
];

export { titles, actionsConfig, breakPoints };
