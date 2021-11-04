import { useState, useEffect } from "react";

import Wrapper from "components/Wrapper";
import Menu from "components/Menu";
import CardBalance from "components/CardBalance";
import RvTable from "components/RvTable";
import { Button } from "components/Button";

import * as S from "./styles";
//import { useCashFlow } from "hooks";
import RfTable from "components/RfTable";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { cashFlowActions } from "store/ducks/cashFlow";
import { usePageStatus } from "hooks/usePageStatus";

function Wallet() {
  const [toggleStatus, setToggleStatus] = useState("rv");
  const {
    isHidding,
    handleChangeStatusToIsHidding,
    handleChangeStatusToInitial,
    isAdding,
    handleChangeStatusToIsAdding,
  } = usePageStatus();
  // const { total, rf, rv, tableDataRv, tableDataRf } = useCashFlow();

  const dispatch = useAppDispatch();
  const {
    variableIncomeList,
    fixedIncomeList,
    fixedIncome,
    variableIncome,
    totalIncome,
  } = useAppSelector((state) => state.cashFlow);

  //console.log("data", cashFlowState);

  useEffect(() => {
    const {
      updateFixedIncome,
      updateVariableIncome,
      updateTotalIncome,
      updateVariableIncomeList,
      updateFixedIncomeList,
    } = cashFlowActions;
    dispatch(updateFixedIncome());
    dispatch(updateVariableIncome());
    dispatch(updateTotalIncome());
    dispatch(updateVariableIncomeList());
    dispatch(updateFixedIncomeList());
  }, [dispatch, variableIncomeList.length, fixedIncomeList.length]);

  const addItemToTable = () => {
    isAdding ? handleChangeStatusToInitial() : handleChangeStatusToIsAdding();
  };

  const handleToggleIsHidding = () => {
    if (!isAdding) {
      isHidding
        ? handleChangeStatusToInitial()
        : handleChangeStatusToIsHidding();
    }
  };

  const handleToggleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStatus(event.target.value);
  };

  const variableIncomeTotal = variableIncomeList.reduce((acc, item) => {
    acc += item.price * item.stockAmount;
    return acc;
  }, 0);

  const fixedIncomeTotal = fixedIncomeList.reduce((acc, item) => {
    acc += item.totalPrice;
    return acc;
  }, 0);

  return (
    <Wrapper>
      <Menu />
      <S.Container>
        <S.CardWrapper>
          <CardBalance type="total" value={totalIncome} hide={isHidding} />
          <CardBalance
            type="rf"
            value={fixedIncome / totalIncome}
            total={fixedIncomeTotal}
            hide={isHidding}
          />
          <CardBalance
            type="rv"
            value={variableIncome / totalIncome}
            total={variableIncomeTotal}
            hide={isHidding}
          />
        </S.CardWrapper>

        <S.ButtonsWrapper isAdding={isAdding}>
          <S.ActionButtonsWrapper isAdding={isAdding}>
            <Button
              variant="icon"
              icon={isHidding ? "/icons/eye-off.svg" : "/icons/eye.svg"}
              iconSize="medium"
              onClick={handleToggleIsHidding}
              disabled={isAdding}
            ></Button>
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

        {}
        <S.TableWrapper>
          {toggleStatus === "rv" ? (
            <RvTable
              tableDataRv={variableIncomeList}
              isAdding={isAdding}
              setIsAdding={handleChangeStatusToInitial}
              hide={isHidding}
              total={totalIncome}
            />
          ) : (
            <RfTable
              tableDataRf={fixedIncomeList}
              isAdding={isAdding}
              setIsAdding={handleChangeStatusToInitial}
              hide={isHidding}
              total={totalIncome}
            />
          )}
        </S.TableWrapper>
      </S.Container>
    </Wrapper>
  );
}

export default Wallet;
