import Wrapper from "components/Wrapper";
import Menu from "components/Menu";
import CardBalance from "components/CardBalance";
import Table from "components/Table";
import { Button } from "components/Button";

import * as S from "./styles";

const tableData = [
  {
    stock: "ABEV3",
    type: "Ação",
    price: 30,
    idealPorcentage: 8,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 10,
    status: "Comprar",
  },
  {
    stock: "HGLG11",
    type: "FII",
    price: 110,
    idealPorcentage: 8,
    currentPorcentage: 5,
    stockAmount: 10,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
];

function Wallet() {
  return (
    <Wrapper>
      <Menu />
      <S.Container>
        <S.CardWrapper>
          <CardBalance type="total" value={1000} />
          <CardBalance type="rf" value={30} />
          <CardBalance type="rv" value={70} />
        </S.CardWrapper>

        <S.ButtonsWrapper>
          <Button variant="icon" icon="icons/plus.svg">
            Adicionar
          </Button>
          <Button variant="icon" icon="icons/edit.svg">
            Editar
          </Button>
          <Button variant="icon" icon="icons/chart-bar.svg">
            Ver gráfico
          </Button>
        </S.ButtonsWrapper>

        <Table tableData={tableData} />
      </S.Container>
    </Wrapper>
  );
}

export default Wallet;
