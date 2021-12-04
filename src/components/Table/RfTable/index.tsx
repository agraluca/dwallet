import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import TableHeader from "components/TableHeader";
import { useState, useEffect, ChangeEvent } from "react";
import { formatNumberToBrlCurrency } from "utils";
import { useAppDispatch } from "hooks/useReduxHooks";
import { cashFlowActions } from "store/ducks/cashFlow";

import {
  alreadyExistsInList,
  hasOverLimit,
  existZeroValueInIdealPercentage,
} from "utils/functions";

import {
  TableWrapper,
  TableBody,
  TableAddingRow,
  TableBodyData,
  IsEdittingMenu,
  TableRow,
  TableCell,
} from "../TableElements/index";
import toast from "react-hot-toast";
import Toast from "components/Toast";

export type TableDataRfProps = {
  name: string;
  idealPorcentage: number;
  currentPorcentage: number;
  totalPrice: number;
  shouldBuyPrice: number;
  status: string;
};

export type TableProps = {
  tableDataRf: TableDataRfProps[];
  isAdding: boolean;
  setIsAdding: () => void;
  hide?: boolean;
  isEditting: boolean;
  handleCancelIsEditting: () => void;
};

const columnsFixedIncomeTable = [
  { name: "Nome" },
  { name: "% Ideal" },
  { name: "% Atual" },
  { name: "Valor Total" },
  { name: "Valor p/ comprar" },
  { name: "Status" },
];

const tableFormValuesInitialValues = {
  name: "",
  idealPorcentage: 0,
  currentPorcentage: 0,
  totalPrice: 0,
  shouldBuyPrice: 0,
  status: "",
};

function RfTable({
  tableDataRf,
  isAdding,
  setIsAdding,
  hide = false,
  isEditting = false,
  handleCancelIsEditting,
}: TableProps) {
  const [tableFormValues, setTableFormValues] = useState(
    tableFormValuesInitialValues
  );
  const [tableRfCopy, setTableRfCopy] = useState([...tableDataRf]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTableRfCopy([...tableDataRf]);
  }, [isEditting, tableDataRf]);

  useEffect(() => {
    if (!isAdding) {
      setTableFormValues(tableFormValuesInitialValues);
    }
  }, [isAdding]);

  const handleInputChange = (field: string, value: string) => {
    setTableFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    field: boolean
  ) => {
    const slicedData = tableRfCopy.slice();

    if (field && Number(event.target.value) >= 0) {
      slicedData[index] = {
        ...slicedData[index],
        idealPorcentage: Number(event.target.value),
      };
    } else if (Number(event.target.value) >= 0) {
      slicedData[index] = {
        ...slicedData[index],
        totalPrice: Number(event.target.value),
      };
    }
    setTableRfCopy(slicedData);
  };

  const addItemToTable = () => {
    if (Number(tableFormValues.idealPorcentage) === 0) {
      toast.custom(
        <Toast title="Porcentagem ideal não pode ser 0%" type="error" />,
        { position: "top-right" }
      );

      return;
    }

    const newValue = {
      name: tableFormValues.name,
      idealPorcentage: Number(tableFormValues.idealPorcentage),
      currentPorcentage: 0,
      totalPrice: Number(tableFormValues.totalPrice),
      shouldBuyPrice: 0,
      status: "Segurar",
    };
    const exists = alreadyExistsInList(newValue.name, "name", tableDataRf);
    const overLimit = hasOverLimit(tableDataRf, 100, newValue.idealPorcentage);

    if (overLimit) {
      toast.custom(
        <Toast
          title="Porcentagem ideal excede o limite de 100%"
          type="error"
        />,
        { position: "top-right" }
      );

      return;
    }

    if (exists) {
      toast.custom(
        <Toast title="Já existe esse ativo em sua carteira." type="error" />,
        { position: "top-right" }
      );
      return;
    }
    const { addNewValueToFixedIncomeList } = cashFlowActions;
    dispatch(addNewValueToFixedIncomeList(newValue));

    setTableFormValues(tableFormValuesInitialValues);
    setIsAdding();
  };

  const onCancel = () => {
    handleCancelIsEditting();
    setTableRfCopy([...tableDataRf]);
  };

  const onSave = () => {
    const { editFixedIncomeList } = cashFlowActions;

    const overLimit = hasOverLimit(tableRfCopy, 100);
    const existIdealPercentageZero =
      existZeroValueInIdealPercentage(tableRfCopy);

    if (existIdealPercentageZero) {
      toast.custom(
        <Toast title="Porcentagem ideal não pode ser 0%" type="error" />,
        { position: "top-right" }
      );

      return;
    }

    if (overLimit) {
      toast.custom(
        <Toast
          title="Porcentagem ideal excede o limite de 100%"
          type="error"
        />,
        { position: "top-right" }
      );

      return;
    }

    dispatch(editFixedIncomeList(tableRfCopy));
    handleCancelIsEditting();
    setTableRfCopy([...tableRfCopy]);
  };

  return (
    <>
      {isAdding && (
        <TableWrapper className="table__wrapper--isAdding">
          <TableBody>
            <TableAddingRow>
              <TableBodyData>
                <InputWithLabel
                  label="Nome:"
                  onInputChange={(value) => handleInputChange("name", value)}
                />
              </TableBodyData>

              <TableBodyData>
                <InputWithLabel
                  label="% Ideal:"
                  onInputChange={(value) =>
                    handleInputChange("idealPorcentage", value)
                  }
                />
              </TableBodyData>

              <TableBodyData>
                <InputWithLabel
                  label="Preço:"
                  onInputChange={(value) =>
                    handleInputChange("totalPrice", value)
                  }
                  value={tableFormValues.totalPrice}
                />
              </TableBodyData>
              <TableBodyData className="table__body-button-container">
                <Button
                  onClick={addItemToTable}
                  className="table__body-button"
                  disabled={Number(tableFormValues.totalPrice) === 0}
                >
                  Adicionar
                </Button>
              </TableBodyData>
            </TableAddingRow>
          </TableBody>
        </TableWrapper>
      )}
      {isEditting && <IsEdittingMenu onCancel={onCancel} onSave={onSave} />}

      {tableDataRf.length > 0 && (
        <TableWrapper>
          <TableHeader columns={columnsFixedIncomeTable} />
          <TableBody>
            {tableDataRf?.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableBodyData>{data.name.toUpperCase()}</TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      isEditting={isEditting}
                      isEdittingProps={{
                        index,
                        handleChange,
                        field: true,
                      }}
                      hasPercentage={!hide}
                      value={
                        isEditting
                          ? tableRfCopy[index].idealPorcentage
                          : data.idealPorcentage
                      }
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      hasPercentage={!hide}
                      value={data.currentPorcentage}
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      isEditting={isEditting}
                      isEdittingProps={{
                        index,
                        handleChange,
                        field: false,
                      }}
                      value={
                        isEditting
                          ? tableRfCopy[index].totalPrice
                          : formatNumberToBrlCurrency(data.totalPrice)
                      }
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      value={formatNumberToBrlCurrency(data.shouldBuyPrice)}
                    />
                  </TableBodyData>
                  <TableBodyData
                    className={
                      data.status === "Comprar"
                        ? "table__body-data_green"
                        : "table__body-data_red"
                    }
                  >
                    <TableCell isHidding={hide} value={data.status} />
                  </TableBodyData>
                </TableRow>
              );
            })}
          </TableBody>
        </TableWrapper>
      )}
    </>
  );
}

export default RfTable;
