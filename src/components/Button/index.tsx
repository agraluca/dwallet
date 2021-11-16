import { ButtonHTMLAttributes } from "react";

import * as S from "./styles";

export type ButtonProps = {
  variant?: string;
  icon?: string;
  iconSize?: "small" | "medium" | "large";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "",
  icon,
  iconSize,
  loading = false,
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
      return (
        <S.Button {...rest}>{loading ? <S.LoadingDots /> : children}</S.Button>
      );
  }
}
