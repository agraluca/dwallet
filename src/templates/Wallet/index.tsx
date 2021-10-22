import { useState } from "react";

import Wrapper from "components/Wrapper";
import Menu from "components/Menu";
import CardBalance from "components/CardBalance";
import RvTable from "components/RvTable";
import { Button } from "components/Button";

import * as S from "./styles";
import { useCashFlow } from "hooks";
import RfTable from "components/RfTable";

function Wallet() {
  const [isAdding, setIsAdding] = useState(false);
  const [toggleStatus, setToggleStatus] = useState("rv");
  const { total, rf, rv, tableDataRv, tableDataRf } = useCashFlow();

  const addItemToTable = () => {
    isAdding ? setIsAdding(false) : setIsAdding(true);
  };

  const handleToggleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStatus(event.target.value);
  };

  const rvTotal = tableDataRv.reduce((acc, item) => {
    acc += item.price * item.stockAmount;
    return acc;
  }, 0);

  const rfTotal = tableDataRf.reduce((acc, item) => {
    acc += item.totalPrice;
    return acc;
  }, 0);

  return (
    <Wrapper>
      <Menu />
      <S.Container>
        <S.CardWrapper>
          <CardBalance type="total" value={total} />
          <CardBalance type="rf" value={rf / total} total={rfTotal} />
          <CardBalance type="rv" value={rv / total} total={rvTotal} />
        </S.CardWrapper>

        <S.ButtonsWrapper>
          <S.ActionButtonsWrapper isAdding={isAdding}>
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
          </S.ActionButtonsWrapper>
          <S.ToggleContainer>
            <S.SwitchInput
              type="radio"
              id="radio-one"
              name="switch-one"
              value="rf"
              onChange={handleToggleStatus}
              checked={toggleStatus === "rf"}
            />
            <S.SwitchLabel htmlFor="radio-one">Renda Fixa</S.SwitchLabel>
            <S.SwitchInput
              type="radio"
              id="radio-two"
              name="switch-one"
              value="rv"
              onChange={handleToggleStatus}
              checked={toggleStatus === "rv"}
            />
            <S.SwitchLabel htmlFor="radio-two">Renda Variável</S.SwitchLabel>
          </S.ToggleContainer>
        </S.ButtonsWrapper>

        <S.TableWrapper>
          {toggleStatus === "rv" ? (
            <RvTable
              tableDataRv={tableDataRv}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
            />
          ) : (
            <RfTable
              tableDataRf={tableDataRf}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
            />
          )}
        </S.TableWrapper>
      </S.Container>
    </Wrapper>
  );
}

export default Wallet;
