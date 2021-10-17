import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { TableDataRfProps } from "contexts/cashFlowContext";
import { useCashFlow } from "hooks";
import { useState } from "react";
import { formatNumberToBrlCurrency } from "utils";

import * as S from "./styles";

export type TableProps = {
  tableDataRf: TableDataRfProps[];
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
};

function RfTable({ tableDataRf, isAdding, setIsAdding }: TableProps) {
  const tableFormValuesInitialValues = {
    name: "",
    idealPorcentage: 0,
    currentPorcentage: 0,
    totalPrice: 0,
    shouldBuyPrice: 0,
    status: "",
  };
  const [tableFormValues, setTableFormValues] = useState(
    tableFormValuesInitialValues
  );

  const { total, setTableDataRf } = useCashFlow();

  const handleInputChange = (field: string, value: string) => {
    setTableFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const addItemToTable = () => {
    const currentPorcentage = (
      (Number(tableFormValues.totalPrice) /
        (total + Number(tableFormValues.totalPrice))) *
      100
    ).toFixed(2);
    const status =
      Number(currentPorcentage) < Number(tableFormValues.idealPorcentage);

    setTableDataRf([
      ...tableDataRf,
      {
        name: tableFormValues.name,
        idealPorcentage: Number(tableFormValues.idealPorcentage),
        currentPorcentage: Number(currentPorcentage),
        totalPrice: Number(tableFormValues.totalPrice),
        shouldBuyPrice: status
          ? Math.ceil(
              (Number(tableFormValues.idealPorcentage) *
                Number(tableFormValues.totalPrice)) /
                Number(currentPorcentage) -
                Number(tableFormValues.totalPrice)
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
                  label="Nome:"
                  onInputChange={(value) => handleInputChange("name", value)}
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

              <S.TableBodyData>
                <InputWithLabel
                  label="Preço:"
                  onInputChange={(value) =>
                    handleInputChange("totalPrice", value)
                  }
                  value={tableFormValues.totalPrice}
                />
              </S.TableBodyData>
              <S.TableBodyData className="table__body-button-container">
                <Button
                  onClick={addItemToTable}
                  className="table__body-button"
                  disabled={Number(tableFormValues.totalPrice) === 0}
                >
                  Adicionar
                </Button>
              </S.TableBodyData>
            </S.TableAddingRow>
          </S.TableBody>
        </S.TableWrapper>
      )}

      <S.TableWrapper>
        {tableDataRf?.length && (
          <>
            <S.TableHeader>
              <S.TableHeaderRow>
                <S.TableHeaderData>Nome</S.TableHeaderData>
                <S.TableHeaderData>% Ideal</S.TableHeaderData>
                <S.TableHeaderData>% Atual</S.TableHeaderData>
                <S.TableHeaderData>Valor Total</S.TableHeaderData>
                <S.TableHeaderData>Valor p/ comprar</S.TableHeaderData>
                <S.TableHeaderData>Status</S.TableHeaderData>
              </S.TableHeaderRow>
            </S.TableHeader>
            <S.TableBody>
              {tableDataRf?.map((data, index) => {
                return (
                  <S.TableRow key={index}>
                    <S.TableBodyData>{data.name.toUpperCase()}</S.TableBodyData>
                    <S.TableBodyData>{data.idealPorcentage}%</S.TableBodyData>
                    <S.TableBodyData>{data.currentPorcentage}%</S.TableBodyData>
                    <S.TableBodyData>
                      {formatNumberToBrlCurrency(data.totalPrice)}
                    </S.TableBodyData>
                    <S.TableBodyData>
                      {formatNumberToBrlCurrency(data.shouldBuyPrice)}
                    </S.TableBodyData>
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

export default RfTable;
