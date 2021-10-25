import { InputHTMLAttributes } from "react";
import * as S from "./styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...rest }: InputProps) {
  return <S.Input className={className} {...rest} />;
}

export default Input;
