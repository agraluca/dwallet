import { InputHTMLAttributes } from "react";
import * as S from "./styles";

export type InputWithLabelProps = {
  label: string;
  placeholder?: string;
};

function InputWithLabel({
  label,
  placeholder = "Digite aqui",
  ...rest
}: InputWithLabelProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <S.Label>
      {label}
      <S.Input placeholder={placeholder} {...rest} />
    </S.Label>
  );
}

export default InputWithLabel;
