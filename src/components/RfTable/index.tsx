import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import TableHeader from "components/TableHeader";
import { TableDataRfProps } from "contexts/cashFlowContext";
import { useState } from "react";
import { formatNumberToBrlCurrency } from "utils";
import { useAppDispatch } from "hooks/useReduxHooks";
import { cashFlowActions } from "store/ducks/cashFlow";

import * as S from "./styles";
import { alreadyExistsInList } from "utils/functions";

export type TableProps = {
  tableDataRf: TableDataRfProps[];
  isAdding: boolean;
  setIsAdding: () => void;
  hide?: boolean;
  total: number;
};

const columnsFixedIncomeTable = [
  { name: "Nome" },
  { name: "% Ideal" },
  { name: "% Atual" },
  { name: "Valor Total" },
  { name: "Valor p/ comprar" },
  { name: "Status" },
];

function RfTable({
  tableDataRf,
  isAdding,
  setIsAdding,
  hide = false,
  total,
}: TableProps) {
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

  const dispatch = useAppDispatch();

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

    const newValue = {
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
    };
    const exists = alreadyExistsInList(newValue.name, "name", tableDataRf);

    if (exists) {
      alert("Já existe esse ativo em sua carteira.");
      return;
    }
    const { addNewValueToFixedIncomeList } = cashFlowActions;
    dispatch(addNewValueToFixedIncomeList(newValue));

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
      {tableDataRf.length > 0 && (
        <S.TableWrapper>
          <TableHeader columns={columnsFixedIncomeTable} />
          <S.TableBody>
            {tableDataRf?.map((data, index) => {
              return (
                <S.TableRow key={index}>
                  <S.TableBodyData>{data.name.toUpperCase()}</S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : `${data.idealPorcentage}%`}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : `${data.currentPorcentage}%`}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide ? " - " : formatNumberToBrlCurrency(data.totalPrice)}
                  </S.TableBodyData>
                  <S.TableBodyData>
                    {hide
                      ? " - "
                      : formatNumberToBrlCurrency(data.shouldBuyPrice)}
                  </S.TableBodyData>
                  <S.TableBodyData
                    className={
                      data.status === "Comprar"
                        ? "table__body-data_green"
                        : "table__body-data_red"
                    }
                  >
                    {hide ? " - " : data.status}
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

export default RfTable;
