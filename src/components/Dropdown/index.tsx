import { useState } from "react";
import * as S from "./styles";

export type DropDownProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};
function Dropdown({ title, children }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Title onClick={() => setIsOpen(!isOpen)}>{title}</S.Title>
      <S.Content isOpen={isOpen} aria-hidden={!isOpen}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
}

export default Dropdown;
