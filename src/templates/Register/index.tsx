import { useState } from "react";

import Wrapper from "components/Wrapper";
import Heading from "components/Heading";
import Input from "components/Input";
import { Button } from "components/Button";
import Link from "next/link";

import useAuth from "hooks/useAuth";

import * as S from "./styles";

import { useAppSelector } from "hooks/useReduxHooks";

function RegisterUser() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp } = useAuth();

  const loading = useAppSelector((state) => state.loading);
  function handleInput(field: string, value: string) {
    setFormValues((prevState) => ({ ...prevState, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signUp(formValues);
  }

  return (
    <Wrapper zeroIndex>
      <S.Wrapper>
        <S.Content>
          <S.TitleWrapper>
            <S.Logo src="/img/logo.svg" alt="Logo do projeto" />
            <Heading level={1} className="login--title">
              Crie sua conta
            </Heading>
          </S.TitleWrapper>

          <S.RegisterForm onSubmit={handleSubmit}>
            <Input
              type="text"
              onInputChange={(value) => handleInput("name", value)}
              placeholder="Nome"
              inputSize="full"
              icon="person"
            />
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
            <Input
              type="password"
              onInputChange={(value) => handleInput("confirmPassword", value)}
              placeholder="Senha"
              inputSize="full"
              icon="lock"
            />
            <Button
              className="submitButton"
              type="submit"
              disabled={loading.registerUserLoading}
            >
              {loading.registerUserLoading ? (
                <S.FormLoading />
              ) : (
                <span>Crie sua conta</span>
              )}
            </Button>
          </S.RegisterForm>
          <Link href="/">
            <S.LoginLink>Voltar</S.LoginLink>
          </Link>
        </S.Content>
        <S.IlustrationWrapper>
          <S.Illustration
            src="/img/register.svg"
            alt="Uma pessoa sentada na frente do computador."
          />
        </S.IlustrationWrapper>
      </S.Wrapper>
    </Wrapper>
  );
}

export default RegisterUser;
