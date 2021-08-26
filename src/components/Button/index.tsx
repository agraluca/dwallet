import { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";
import * as S from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
  icon?: string;
}

export function Button({ children, variant = "", icon, ...rest }: ButtonProps) {
  switch (variant) {
    case "default":
      return <S.Button {...rest}>{children}</S.Button>;
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
