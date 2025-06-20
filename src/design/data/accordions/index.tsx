import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Text, Icon, Divider } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import { StyledContainer, StyledHead } from "./styles";

interface IAccordion {
  title: string;
  defaultOpen?: boolean;
  children?: JSX.Element | JSX.Element[];
}
const Accordion = (props: IAccordion) => {
  const { title, defaultOpen = true, children } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledContainer>
      <StyledHead onClick={handleToggleOpen}>
        <Text
          type="label"
          size={"large"}
          appearance={ComponentAppearance.DARK}
          weight="bold"
          ellipsis
        >
          {title}
        </Text>

        <Icon
          icon={isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          appearance={ComponentAppearance.DARK}
          spacing="compact"
          cursorHover={true}
          size="24px"
        />
      </StyledHead>

      {isOpen && (
        <>
          <Divider dashed={true} />
          {children}
        </>
      )}
    </StyledContainer>
  );
};

export { Accordion };
export type { IAccordion };
