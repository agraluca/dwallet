import { InputHTMLAttributes, useState } from "react";
import * as S from "./styles";

export type InputProps = {
  onInputChange?: (value: string) => void;
  icon?: "person" | "email" | "lock";
  placeholder?: string;
  inputSize?: "normal" | "large";
  type?: "text" | "password" | "email";
  error?: string;
  initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type IconsProps = {
  person: string;
  email: string;
  lock: string;
};

function Input({
  onInputChange,
  icon = "person",
  placeholder,
  inputSize = "normal",
  type = "text",
  error,
  initialValue = "",
  ...props
}: InputProps) {
  const [value, setValue] = useState(initialValue);

  const IconsData: IconsProps = {
    person: "img/person_outline.svg",
    email: "img/At.svg",
    lock: "img/lock_outline.svg",
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInputChange && onInputChange(newValue);
  }

  return (
    <S.Wrapper>
      <S.InputWrapper inputSize={inputSize} error={error} aria-label="input">
        <img src={IconsData[icon]} alt={icon} />
        <S.Input
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error error={error}>{error}</S.Error>}
    </S.Wrapper>
  );
}

export default Input;
