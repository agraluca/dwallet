import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { useCashFlow } from "hooks";
import { useState } from "react";
import { formatNumberToBrlCurrency, typeCheck } from "utils";
// import api from "services/axios";
import * as S from "./styles";

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
  setIsAdding: (value: boolean) => void;
};

function RvTable({ tableDataRv, isAdding, setIsAdding }: TableProps) {
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

  const { total, setTableDataRv } = useCashFlow();

  const handleInputChange = (field: string, value: string) => {
    setTableFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleTickerBlur = async () => {
    // const response = await api.get(
    //   `mainsearchquery?q=${tableFormValues.ticker}&country=`
    // );

    // console.log(response.data);
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

  const addItemToTable = () => {
    const currentPorcentage = (
      ((Number(tableFormValues.price) * Number(tableFormValues.quantity)) /
        (total + Number(tableFormValues.total))) *
      100
    ).toFixed(2);
    const status =
      Number(currentPorcentage) < Number(tableFormValues.idealPorcentage);

    setTableDataRv([
      ...tableDataRv,
      {
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
      },
    ]);
    setTableFormValues(tableFormValuesInitialValues);
    setIsAdding(false);
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
                  disabled={Number(tableFormValues.total) === 0}
                >
                  Adicionar
                </Button>
              </S.TableBodyData>
            </S.TableAddingRow>
          </S.TableBody>
        </S.TableWrapper>
      )}

      <S.TableWrapper>
        {tableDataRv?.length && (
          <>
            <S.TableHeader>
              <S.TableHeaderRow>
                <S.TableHeaderData>Ticker</S.TableHeaderData>
                <S.TableHeaderData>Tipo</S.TableHeaderData>
                <S.TableHeaderData>Preço</S.TableHeaderData>
                <S.TableHeaderData>% Ideal</S.TableHeaderData>
                <S.TableHeaderData>% Atual</S.TableHeaderData>
                <S.TableHeaderData>Qtd</S.TableHeaderData>
                <S.TableHeaderData>Qtd p/ comprar</S.TableHeaderData>
                <S.TableHeaderData>Status</S.TableHeaderData>
              </S.TableHeaderRow>
            </S.TableHeader>
            <S.TableBody>
              {tableDataRv?.map((data, index) => {
                return (
                  <S.TableRow key={index}>
                    <S.TableBodyData>
                      {data.stock.toUpperCase()}
                    </S.TableBodyData>
                    <S.TableBodyData>{data.type}</S.TableBodyData>
                    <S.TableBodyData>
                      {formatNumberToBrlCurrency(data.price)}
                    </S.TableBodyData>
                    <S.TableBodyData>{data.idealPorcentage}%</S.TableBodyData>
                    <S.TableBodyData>{data.currentPorcentage}%</S.TableBodyData>
                    <S.TableBodyData>{data.stockAmount}</S.TableBodyData>
                    <S.TableBodyData>{data.shouldBuyAmount}</S.TableBodyData>
                    <S.TableBodyData
                      className={
                        data.status === "Comprar"
                          ? "table__body-data_green"
                          : "table__body-data_red"
                      }
                    >
                      {data.status}
                    </S.TableBodyData>
                  </S.TableRow>
                );
              })}
            </S.TableBody>
          </>
        )}
      </S.TableWrapper>
    </>
  );
}

export default RvTable;
