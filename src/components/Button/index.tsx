import { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";
import * as S from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "icon";
  icon?: string;
}

export function Button({
  children,
  variant = "default",
  icon,
  ...rest
}: ButtonProps) {
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
      return <Button {...rest}>{children}</Button>;
  }
}
