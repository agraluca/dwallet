import { ButtonHTMLAttributes } from "react";

import * as S from "./styles";

export type ButtonProps = {
  variant?: string;
  icon?: string;
  iconSize?: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "",
  icon,
  iconSize = "small",
  ...rest
}: ButtonProps) {
  switch (variant) {
    case "icon":
      return (
        <S.IconButton {...rest}>
          {children} <S.Icon src={icon} alt="icone" iconSize={iconSize} />
        </S.IconButton>
      );
    default:
      return <S.Button {...rest}>{children}</S.Button>;
  }
}
