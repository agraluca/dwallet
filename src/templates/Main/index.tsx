import * as S from "./styles";
import Wrapper from "components/Wrapper";

import Heading from "components/Heading";
import { useState } from "react";
import { signin } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Input from "components/Input";
import { Button } from "components/Button";

function Main({
  title = "DWallet",
  description = "Seu sistema de balanceamento de carteira",
}) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const routes = useRouter();
  const { push, query } = routes;

  function handleInput(field: string, value: string) {
    setFormValues((prevState) => ({ ...prevState, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await signin("credentials", {
      ...formValues,
      redirect: false,
      callbackUrl: query.callbackUrl
        ? `${process.env.NEXT_PUBLIC_URL}${query?.callbackUrl}`
        : `${process.env.NEXT_PUBLIC_URL}/wallet`,
    });
    if (result?.url) {
      return push(result?.url);
    }
    setLoading(false);
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
              inputSize="normal"
              icon="email"
            />
            <Input
              type="password"
              onInputChange={(value) => handleInput("password", value)}
              placeholder="Senha"
              inputSize="normal"
              icon="lock"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <S.FormLoading /> : <span>Entrar</span>}
            </Button>
          </S.FormLogin>
        </S.Content>
        <S.IlustrationWrapper>
          <S.Illustration src="/img/hero.svg" alt="Uma carteira" />
        </S.IlustrationWrapper>
      </S.Wrapper>
    </Wrapper>
  );
}

export default Main;
