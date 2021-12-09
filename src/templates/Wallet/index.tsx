import { useState, useEffect } from "react";

import Wrapper from "components/Wrapper";
import Menu from "components/Menu";
import CardBalance from "components/CardBalance";
import RvTable from "components/Table/RvTable";
import { Button } from "components/Button";
import * as S from "./styles";
import RfTable from "components/Table/RfTable";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { usePageStatus } from "hooks/usePageStatus";
import { fetchUserWallet } from "store/fetchActions/fetchWallet";
import Spinner from "components/Spinner";
import Chart from "components/Graph";

function Wallet() {
  const [toggleStatus, setToggleStatus] = useState("rv");
  const [showGraph, setShowGraph] = useState(false);
  const [chartData, setChartData] = useState({});

  const handleShowGraph = () => {
    setShowGraph(!showGraph);
  };

  const {
    isHidding,
    isAdding,
    isEditting,
    handleChangeStatusToIsHidding,
    handleChangeStatusToInitial,
    handleChangeStatusToIsAdding,
    handleChangeStatusToIsEditting,
  } = usePageStatus();

  const dispatch = useAppDispatch();
  const {
    variableIncomeList,
    fixedIncomeList,
    fixedIncome,
    variableIncome,
    totalIncome,
  } = useAppSelector((state) => state.cashFlow);
  const { getWalletLoading, removeWalletLoading, editWalletLoading } =
    useAppSelector((state) => state.loading);

  const isLoading =
    (getWalletLoading || removeWalletLoading || editWalletLoading) ?? false;

  const variableIncomeTotal = variableIncomeList.reduce((acc, item) => {
    acc += item.price * item.stockAmount;
    return acc;
  }, 0);

  const fixedIncomeTotal = fixedIncomeList.reduce((acc, item) => {
    acc += item.totalPrice;
    return acc;
  }, 0);

  useEffect(() => {
    dispatch(fetchUserWallet());
    toggleStatus === "rv"
      ? setChartData({
          labels: variableIncomeList.map((item) => {
            return item.stock.toUpperCase();
          }),
          datasets: [
            {
              label: "Preço",
              data: variableIncomeList.map((item) => {
                return item.price * item.stockAmount;
              }),
              backgroundColor: variableIncomeList.map(() => {
                return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
              }),
            },
          ],
        })
      : setChartData({
          labels: fixedIncomeList.map((item) => {
            return item.name;
          }),
          datasets: [
            {
              label: "Preço",
              data: fixedIncomeList.map((item) => {
                return item.totalPrice;
              }),
              backgroundColor: variableIncomeList.map(() => {
                return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
              }),
            },
          ],
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, toggleStatus]);

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

  return (
    <Wrapper>
      <S.WalletWrapper>
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
              <Button
                variant="icon"
                icon="icons/edit.svg"
                onClick={handleChangeStatusToIsEditting}
                disabled={isEditting}
              >
                Editar
              </Button>
              <Button
                variant="icon"
                icon="icons/chart-bar.svg"
                onClick={handleShowGraph}
              >
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
          {isLoading ? (
            <S.SvgContainer>
              <Spinner />
            </S.SvgContainer>
          ) : showGraph ? (
            <Chart chartData={chartData} />
          ) : (
            <S.TableWrapper>
              {toggleStatus === "rv" ? (
                <RvTable
                  tableDataRv={variableIncomeList}
                  isAdding={isAdding}
                  setIsAdding={handleChangeStatusToInitial}
                  hide={isHidding}
                  isEditting={isEditting}
                  handleCancelIsEditting={handleChangeStatusToInitial}
                />
              ) : (
                <RfTable
                  tableDataRf={fixedIncomeList}
                  isAdding={isAdding}
                  setIsAdding={handleChangeStatusToInitial}
                  hide={isHidding}
                  isEditting={isEditting}
                  handleCancelIsEditting={handleChangeStatusToInitial}
                />
              )}
            </S.TableWrapper>
          )}
        </S.Container>
      </S.WalletWrapper>
    </Wrapper>
  );
}

export default Wallet;
