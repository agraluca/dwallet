import { InputHTMLAttributes, useState } from "react";
import * as S from "./styles";

export type InputWithLabelProps = {
  label: string;
  placeholder?: string;
  onInputChange?: (value: string) => void;
  initialValue?: string;
};

function InputWithLabel({
  label,
  placeholder = "Digite aqui",
  onInputChange,
  initialValue = "",
  ...rest
}: InputWithLabelProps & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInputChange && onInputChange(newValue);
  };
  return (
    <S.Label>
      {label}
      <S.Input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </S.Label>
  );
}

export default InputWithLabel;
