import * as S from "./styles";

export type ToastProps = {
  title: string;
  type?: "success" | "error" | "warning" | "info";
};

function Toast({ title, type = "info" }: ToastProps) {
  return (
    <S.Wrapper type={type}>
      <S.Title>{title}</S.Title>
    </S.Wrapper>
  );
}

export default Toast;
