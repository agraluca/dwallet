import { ButtonHTMLAttributes } from "react";

import * as S from "./styles";

export type ButtonProps = {
  variant?: string;
  icon?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, variant = "", icon, ...rest }: ButtonProps) {
  switch (variant) {
    case "icon":
      return (
        <S.IconButton {...rest}>
          {children} <S.Icon src={icon} alt="icone" />
        </S.IconButton>
      );
    default:
      return <S.Button {...rest}>{children}</S.Button>;
  }
}
