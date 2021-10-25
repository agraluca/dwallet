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
  const [tableStatus, setTableStatus] = useState("default");
  const [toggleStatus, setToggleStatus] = useState("rv");
  const { total, rf, rv, tableDataRv, tableDataRf } = useCashFlow();

  const isAddingCondition = tableStatus === "isAdding";
  const isHiddingCondition = tableStatus === "isHidding";
  const isEditingCondition = tableStatus === "isEditing";

  const handleToggleIsAdding = () => {
    if (tableStatus === "isAdding") {
      setTableStatus("default");
    } else {
      setTableStatus("isAdding");
    }
  };

  const handleToggleIsHidding = () => {
    if (tableStatus === "default" || tableStatus === "isHidding") {
      setTableStatus((state) =>
        state === "default" ? "isHidding" : "default"
      );
    }
  };

  const handleToggleIsEditing = () => {
    if (tableStatus !== "isAdding")
      setTableStatus((state) =>
        state === "default" ? "isEditing" : "default"
      );
  };

  const handleChangeTableStatusToInitial = () => {
    setTableStatus("default");
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
          <CardBalance type="total" value={total} hide={isHiddingCondition} />
          <CardBalance
            type="rf"
            value={rf / total}
            total={rfTotal}
            hide={isHiddingCondition}
          />
          <CardBalance
            type="rv"
            value={rv / total}
            total={rvTotal}
            hide={isHiddingCondition}
          />
        </S.CardWrapper>

        <S.ButtonsWrapper isAdding={isAddingCondition}>
          <S.ActionButtonsWrapper isAdding={isAddingCondition}>
            <Button
              variant="icon"
              icon={
                isHiddingCondition ? "/icons/eye-off.svg" : "/icons/eye.svg"
              }
              iconSize="medium"
              onClick={handleToggleIsHidding}
              disabled={isAddingCondition || isEditingCondition}
            ></Button>
            <Button
              variant={isAddingCondition ? "" : "icon"}
              onClick={handleToggleIsAdding}
              {...(isAddingCondition ? {} : { icon: "/icons/plus.svg" })}
              disabled={isEditingCondition}
            >
              {isAddingCondition ? "Cancelar" : "Adicionar"}
            </Button>
            <Button
              variant={isEditingCondition ? "" : "icon"}
              icon="icons/edit.svg"
              onClick={handleToggleIsEditing}
              disabled={isAddingCondition}
            >
              {isEditingCondition ? "Cancelar" : "Editar"}
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
              isAdding={isAddingCondition}
              setIsAdding={handleChangeTableStatusToInitial}
              isHidding={tableStatus === "isHidding"}
              isEditing={tableStatus == "isEditing"}
              handleCloseIsEditing={handleChangeTableStatusToInitial}
            />
          ) : (
            <RfTable
              tableDataRf={tableDataRf}
              isAdding={isAddingCondition}
              setIsAdding={handleChangeTableStatusToInitial}
              hide={isHiddingCondition}
            />
          )}
        </S.TableWrapper>
      </S.Container>
    </Wrapper>
  );
}

export default Wallet;
