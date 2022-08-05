import { InputHTMLAttributes, useState } from "react";
import * as S from "./styles";

export type InputProps = {
  onInputChange?: (value: string) => void;
  icon?: "person" | "email" | "lock" | "search";
  placeholder?: string;
  inputSize?: "normal" | "large" | "full" | "search";
  type?: "text" | "password" | "email";
  error?: string;
  initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type IconsProps = {
  person: string;
  email: string;
  lock: string;
  search: string;
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
    search: "img/search.svg",
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInputChange && onInputChange(newValue);
  }

  return (
    <S.Wrapper inputSize={inputSize}>
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
