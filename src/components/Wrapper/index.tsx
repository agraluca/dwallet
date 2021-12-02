import { ReactNode } from "react";
import * as S from "./styles";

export type WrapperProps = {
  children: ReactNode;
  zeroIndex?: boolean;
};

function Wrapper({ children, zeroIndex = false }: WrapperProps) {
  return (
    <S.Wrapper>
      <S.Content zeroIndex={zeroIndex}>{children}</S.Content>
      <S.WaveImg src="/img/wave.svg" alt="wave" className="wave" />
    </S.Wrapper>
  );
}

export default Wrapper;
