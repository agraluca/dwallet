import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { useState } from "react";
import { formatNumberToBrlCurrency, typeCheck } from "utils";
// import api from "services/axios";
import * as S from "./styles";
import { useAppDispatch } from "hooks/useReduxHooks";
import { cashFlowActions } from "store/ducks/cashFlow";
import TableHeader from "components/TableHeader";
import { alreadyExistsInList } from "utils/functions";

export type TableDataRvProps = {
  stock: string;
  type: string;
  price: number;
  idealPorcentage: number;
  currentPorcentage: number;
  stockAmount: number;
  shouldBuyAmount: number;
  status: string;
};

export type TableProps = {
  tableDataRv: TableDataRvProps[];
  isAdding: boolean;
  setIsAdding: () => void;
  hide?: boolean;
  total: number;
};

const columnsVariableIncomeTable = [
  { name: "Ticker" },
  { name: "Tipo" },
  { name: "Preço" },
  { name: "% Ideal" },
  { name: "% Atual" },
  { name: "Qtd" },
  { name: "Qtd p/ comprar" },
  { name: "Status" },
];

function RvTable({
  tableDataRv,
  isAdding,
  setIsAdding,
  hide = false,
  total,
}: TableProps) {
  const tableFormValuesInitialValues = {
    ticker: "",
    type: "",
    price: "",
    idealPorcentage: "",
    quantity: "",
    total: "",
  };
  const [tableFormValues, setTableFormValues] = useState(
    tableFormValuesInitialValues
  );

  const dispatch = useAppDispatch();

  const exists = alreadyExistsInList<TableDataRvProps>(
    tableFormValues.ticker,
    "stock",
    tableDataRv
  );

  const handleInputChange = (field: string, value: string) => {
    setTableFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleTickerBlur = async () => {
    // const response = await api.get(
    //   `mainsearchquery?q=${tableFormValues.ticker}&country=`
    // );

    // console.log(response.data);

    if (exists) {
      alert("Já existe esse ativo em sua carteira.");

      return;
    }
    setTableFormValues((prev) => ({
      ...prev,
      type: typeCheck(tableFormValues.ticker),
      price: "10",
    }));
  };

  const handleQuantityBlur = () => {
    setTableFormValues((prev) => ({
      ...prev,
      total: `${
        Number(tableFormValues.price) * Number(tableFormValues.quantity)
      }`,
    }));
  };

  const alreadyExistsInVariableIncomeList = (stock: string) => {
    const exists = tableDataRv.filter(
      (item) => stock.toUpperCase() === item.stock.toUpperCase()
    );

    return exists.length > 0;
  };

  const addItemToTable = () => {
    const currentPorcentage = (
      ((Number(tableFormValues.price) * Number(tableFormValues.quantity)) /
        (total + Number(tableFormValues.total))) *
      100
    ).toFixed(2);
    const status =
      Number(currentPorcentage) < Number(tableFormValues.idealPorcentage);

    const newValue = {
      stock: tableFormValues.ticker,
      type: tableFormValues.type,
      price: Number(tableFormValues.price),
      idealPorcentage: Number(tableFormValues.idealPorcentage),
      currentPorcentage: Number(currentPorcentage),
      stockAmount: Number(tableFormValues.quantity),
      shouldBuyAmount: status
        ? Math.ceil(
            (Number(tableFormValues.idealPorcentage) *
              Number(tableFormValues.quantity)) /
              Number(currentPorcentage) -
              Number(tableFormValues.quantity)
          )
        : 0,
      status: status ? "Comprar" : "Segurar",
    };

    const { addNewValueToVariableIncomeList } = cashFlowActions;
    const alreadyExists = alreadyExistsInVariableIncomeList(newValue.stock);

    if (alreadyExists) {
      alert("Já existe esse ativo em sua carteira.");

      return;
    }
    dispatch(addNewValueToVariableIncomeList(newValue));

    setTableFormValues(tableFormValuesInitialValues);
    setIsAdding();
  };

  return (
    <>
      {isAdding && (
        <S.TableWrapper className="table__wrapper--isAdding">
          <S.TableBody>
            <S.TableAddingRow>
              <S.TableBodyData>
                <InputWithLabel
                  label="Ticker:"
                  onInputChange={(value) => handleInputChange("ticker", value)}
                  onBlur={handleTickerBlur}
                />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="Tipo:"
                  onInputChange={(value) => handleInputChange("type", value)}
                  placeholder="-"
                  value={tableFormValues.type}
                  disabled
                />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="Preço:"
                  onInputChange={(value) => handleInputChange("price", value)}
                  placeholder={formatNumberToBrlCurrency(0)}
                  value={formatNumberToBrlCurrency(tableFormValues.price)}
                  disabled
                />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="% Ideal:"
                  onInputChange={(value) =>
                    handleInputChange("idealPorcentage", value)
                  }
                />
              </S.TableBodyData>
              <S.TableBodyData>-</S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="Qtd:"
                  onInputChange={(value) =>
                    handleInputChange("quantity", value)
                  }
                  onBlur={handleQuantityBlur}
                />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="Total:"
                  onInputChange={(value) => handleInputChange("total", value)}
                  placeholder={formatNumberToBrlCurrency(0)}
                  value={formatNumberToBrlCurrency(tableFormValues.total)}
                  disabled
                />
              </S.TableBodyData>
              <S.TableBodyData className="table__body-button-container">
                <Button
                  onClick={addItemToTable}
                  className="table__body-button"
                  disabled={Number(tableFormValues.total) === 0 || exists}
                >
                  Adicionar
                </Button>
              </S.TableBodyData>
            </S.TableAddingRow>
          </S.TableBody>
        </S.TableWrapper>
      )}
      {tableDataRv.length > 0 && (
        <S.TableWrapper>
          <TableHeader columns={columnsVariableIncomeTable} />

          <S.TableBody>
            {tableDataRv.map((data, index) => {
              return (
                <S.TableRow key={index}>
                  <S.TableBodyData>{data.stock.toUpperCase()}</S.TableBodyData>
                  <S.TableBodyData>{data.type}</S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : formatNumberToBrlCurrency(data.price)}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : `${data.idealPorcentage}%`}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : `${data.currentPorcentage}%`}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : `${data.stockAmount}`}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : `${data.shouldBuyAmount}`}
                  </S.TableBodyData>
                  <S.TableBodyData
                    className={
                      data.status === "Comprar"
                        ? "table__body-data_green"
                        : "table__body-data_red"
                    }
                  >
                    {hide ? " - " : `${data.status}`}
                  </S.TableBodyData>
                </S.TableRow>
              );
            })}
          </S.TableBody>
        </S.TableWrapper>
      )}
    </>
  );
}

export default RvTable;
