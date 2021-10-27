import { ReactNode } from "react";
import * as S from "./styles";

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <S.Wrapper>
      <S.Content>{children}</S.Content>
      <S.WaveImg src="/img/wave.svg" alt="wave" />
    </S.Wrapper>
  );
}

export default Wrapper;
