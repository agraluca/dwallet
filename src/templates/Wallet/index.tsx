import { useState } from "react";

import Wrapper from "components/Wrapper";
import Menu from "components/Menu";
import CardBalance from "components/CardBalance";
import Table from "components/Table";
import { Button } from "components/Button";

import * as S from "./styles";
import { useCashFlow } from "hooks";

function Wallet() {
  const [isAdding, setIsAdding] = useState(false);
  const { total, rf, rv, tableData } = useCashFlow();

  const addItemToTable = () => {
    isAdding ? setIsAdding(false) : setIsAdding(true);
  };

  return (
    <Wrapper>
      <Menu />
      <S.Container>
        <S.CardWrapper>
          <CardBalance type="total" value={total} />
          <CardBalance type="rf" value={(rf / total) * 100} />
          <CardBalance type="rv" value={(rv / total) * 100} />
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
        <S.TableWrapper>
          <Table
            tableData={tableData}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
          />
        </S.TableWrapper>
      </S.Container>
    </Wrapper>
  );
}

export default Wallet;
