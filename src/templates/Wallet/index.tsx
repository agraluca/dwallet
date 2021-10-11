import { useState } from "react";

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
];

function Wallet() {
  const [isAdding, setIsAdding] = useState(false);
  const [cardBalanceValues] = useState({
    total: 2000,
    rf: 600,
    rv: 1400,
  });

  const addItemToTable = () => {
    isAdding ? setIsAdding(false) : setIsAdding(true);
  };

  return (
    <Wrapper>
      <Menu />
      <S.Container>
        <S.CardWrapper>
          <CardBalance type="total" value={cardBalanceValues.total} />
          <CardBalance
            type="rf"
            value={(cardBalanceValues.rf / cardBalanceValues.total) * 100}
          />
          <CardBalance
            type="rv"
            value={(cardBalanceValues.rv / cardBalanceValues.total) * 100}
          />
        </S.CardWrapper>

        <S.ButtonsWrapper isAdding={isAdding}>
          <Button
            variant={isAdding ? "" : "icon"}
            onClick={addItemToTable}
            {...(isAdding ? {} : { icon: "icons/plus.svg" })}
          >
            {isAdding ? "Cancelar" : "Adicionar"}
          </Button>
          <Button variant="icon" icon="icons/edit.svg">
            Editar
          </Button>
          <Button variant="icon" icon="icons/chart-bar.svg">
            Ver gráfico
          </Button>
        </S.ButtonsWrapper>

        <Table
          tableData={tableData}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          cardBalanceValues={cardBalanceValues}
        />
      </S.Container>
    </Wrapper>
  );
}

export default Wallet;
