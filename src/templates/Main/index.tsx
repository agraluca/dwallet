import { useState } from "react";

import Wrapper from "components/Wrapper";
import Heading from "components/Heading";
import Input from "components/Input";
import { Button } from "components/Button";
import Link from "next/link";

import useAuth from "hooks/useAuth";

import * as S from "./styles";

import { useAppSelector } from "hooks/useReduxHooks";

function Main({
  title = "DWallet",
  description = "Seu sistema de balanceamento de carteira",
}) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useAuth();

  const { getTokenLoading } = useAppSelector((state) => state.loading);

  function handleInput(field: string, value: string) {
    setFormValues((prevState) => ({ ...prevState, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn(formValues);
  }

  return (
    <Wrapper zeroIndex>
      <S.Wrapper>
        <S.Content>
          <S.TitleWrapper>
            <S.Logo src="/img/logo.svg" alt="Logo do projeto" />
            <Heading level={1} className="login--title">
              {title}
            </Heading>
          </S.TitleWrapper>
          <S.Description>{description}</S.Description>

          <S.FormLogin onSubmit={handleSubmit}>
            <Input
              type="text"
              onInputChange={(value) => handleInput("email", value)}
              placeholder="Email"
              inputSize="full"
              icon="email"
            />
            <Input
              type="password"
              onInputChange={(value) => handleInput("password", value)}
              placeholder="Senha"
              inputSize="full"
              icon="lock"
            />
            <Button
              className="submitButton"
              type="submit"
              disabled={getTokenLoading}
            >
              {getTokenLoading ? <S.FormLoading /> : <span>Entrar</span>}
            </Button>
          </S.FormLogin>
          <Link href="/register">
            <S.RegisterLink>Crie sua conta</S.RegisterLink>
          </Link>
        </S.Content>
        <S.IlustrationWrapper>
          <S.Illustration src="/img/hero.svg" alt="Uma carteira" />
        </S.IlustrationWrapper>
      </S.Wrapper>
    </Wrapper>
  );
}

export default Main;
