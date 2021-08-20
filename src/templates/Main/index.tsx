import * as S from "./styles";
import Wrapper from "components/Wrapper";
import Heading from "components/Heading";

function Main({
  title = "DWallet",
  description = "Seu sistema de balanceamento de carteira",
}) {
  return (
    <Wrapper>
      <S.Wrapper>
        <S.Content>
          <S.TitleWrapper>
            <S.Logo src="/img/logo.svg" alt="Logo do projeto" />
            <Heading level={1} className="login--title">
              {title}
            </Heading>
          </S.TitleWrapper>
          <S.Description>{description}</S.Description>

          <S.Button>
            <img
              src="/icons/google.svg"
              alt="google logo"
              className="login--google-logo"
            />
            Entrar com o Google
          </S.Button>
        </S.Content>
        <S.IlustrationWrapper>
          <S.Illustration src="/img/hero.svg" alt="Uma carteira" />
        </S.IlustrationWrapper>
      </S.Wrapper>
    </Wrapper>
  );
}

export default Main;
