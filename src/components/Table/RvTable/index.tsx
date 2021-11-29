import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { ChangeEvent, useState, useEffect } from "react";
import { formatNumberToBrlCurrency, typeCheck } from "utils";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { cashFlowActions } from "store/ducks/cashFlow";
import TableHeader from "components/TableHeader";
import { alreadyExistsInList, hasOverLimit } from "utils/functions";

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
import { getDetailStock } from "store/fetchActions/fetchStocks";

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
  isEditting: boolean;
  handleCancelIsEditting: () => void;
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
  isEditting = false,
  handleCancelIsEditting,
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

  const [tableRvCopy, setTableRvCopy] = useState([...tableDataRv]);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(({ loading }) => loading);

  const exists = alreadyExistsInList<TableDataRvProps>(
    tableFormValues.ticker,
    "stock",
    tableDataRv
  );

  useEffect(() => {
    setTableRvCopy([...tableDataRv]);
  }, [isEditting, tableDataRv]);

  const handleInputChange = (field: string, value: string) => {
    if (field !== "idealPorcentage" && field !== "quantity") {
      setTableFormValues((prev) => ({ ...prev, [field]: value }));
    } else if (
      field === "idealPorcentage" &&
      Number(value) > 0 &&
      Number(value) <= 100
    ) {
      setTableFormValues((prev) => ({ ...prev, [field]: value }));
    } else if (field === "quantity" && Number(value) > 0) {
      setTableFormValues((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleTickerBlur = async () => {
    if (exists) {
      toast.custom(
        <Toast title="Já existe esse ativo em sua carteira." type="warning" />,
        { position: "top-right" }
      );

      return;
    }

    const data = await dispatch(getDetailStock(tableFormValues.ticker));
    if (data) {
      const { tickerType, formattedPrice } = data;

      setTableFormValues((prev) => ({
        ...prev,
        type: typeCheck(tickerType),
        price: formattedPrice,
      }));
    }
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
    const newValue = {
      stock: tableFormValues.ticker,
      type: tableFormValues.type,
      price: Number(tableFormValues.price),
      idealPorcentage: Number(tableFormValues.idealPorcentage),
      currentPorcentage: 0,
      stockAmount: Number(tableFormValues.quantity),
      shouldBuyAmount: 0,
      status: "Segurar",
    };

    const { addNewValueToVariableIncomeList } = cashFlowActions;
    const alreadyExists = alreadyExistsInList(
      newValue.stock,
      "stock",
      tableDataRv
    );

    const overLimit = hasOverLimit(tableDataRv, newValue.idealPorcentage, 100);

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

    if (alreadyExists) {
      toast.custom(
        <Toast title="Já existe esse ativo em sua carteira." type="error" />,
        { position: "top-right" }
      );

      return;
    }
    dispatch(addNewValueToVariableIncomeList(newValue));

    setTableFormValues(tableFormValuesInitialValues);
    setIsAdding();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    field: boolean
  ) => {
    const slicedData = tableRvCopy.slice();

    if (field && Number(event.target.value) >= 0) {
      slicedData[index] = {
        ...slicedData[index],
        idealPorcentage: Number(event.target.value),
      };
    } else if (Number(event.target.value) >= 0) {
      slicedData[index] = {
        ...slicedData[index],
        stockAmount: Number(event.target.value),
      };
    }

    setTableRvCopy(slicedData);
  };

  const onCancel = () => {
    handleCancelIsEditting();
    setTableRvCopy([...tableDataRv]);
  };

  const onSave = () => {
    const { editVariableIncomeList } = cashFlowActions;
    dispatch(editVariableIncomeList(tableRvCopy));
    handleCancelIsEditting();
    setTableRvCopy([...tableDataRv]);
  };

  return (
    <>
      {isAdding && (
        <TableWrapper className="table__wrapper--isAdding">
          <TableBody>
            <TableAddingRow>
              <TableBodyData>
                <InputWithLabel
                  label="Ticker:"
                  onInputChange={(value) => handleInputChange("ticker", value)}
                  onBlur={handleTickerBlur}
                />
              </TableBodyData>
              <TableBodyData>
                <InputWithLabel
                  label="Tipo:"
                  onInputChange={(value) => handleInputChange("type", value)}
                  placeholder="-"
                  value={tableFormValues.type}
                  disabled
                />
              </TableBodyData>
              <TableBodyData>
                <InputWithLabel
                  label="Preço:"
                  onInputChange={(value) => handleInputChange("price", value)}
                  placeholder={formatNumberToBrlCurrency(0)}
                  value={formatNumberToBrlCurrency(tableFormValues.price)}
                  disabled
                />
              </TableBodyData>
              <TableBodyData>
                <InputWithLabel
                  type="number"
                  label="% Ideal:"
                  onInputChange={(value) =>
                    handleInputChange("idealPorcentage", value)
                  }
                  value={tableFormValues.idealPorcentage}
                />
              </TableBodyData>
              <TableBodyData>-</TableBodyData>
              <TableBodyData>
                <InputWithLabel
                  type="number"
                  label="Qtd:"
                  onInputChange={(value) =>
                    handleInputChange("quantity", value)
                  }
                  value={tableFormValues.quantity}
                  onBlur={handleQuantityBlur}
                />
              </TableBodyData>
              <TableBodyData>
                <InputWithLabel
                  label="Total:"
                  onInputChange={(value) => handleInputChange("total", value)}
                  placeholder={formatNumberToBrlCurrency(0)}
                  value={formatNumberToBrlCurrency(tableFormValues.total)}
                  disabled
                />
              </TableBodyData>
              <TableBodyData className="table__body-button-container">
                <Button
                  onClick={addItemToTable}
                  className="table__body-button"
                  disabled={Number(tableFormValues.total) === 0 || exists}
                  loading={loading.getDetailStockLoading}
                >
                  Adicionar
                </Button>
              </TableBodyData>
            </TableAddingRow>
          </TableBody>
        </TableWrapper>
      )}
      {isEditting && <IsEdittingMenu onCancel={onCancel} onSave={onSave} />}

      {tableDataRv.length > 0 && (
        <TableWrapper>
          <TableHeader columns={columnsVariableIncomeTable} />

          <TableBody>
            {tableDataRv.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableBodyData>
                    <TableCell
                      isHidding={false}
                      value={data.stock.toUpperCase()}
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell isHidding={false} value={data.type} />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      value={formatNumberToBrlCurrency(data.price)}
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      isEditting={isEditting}
                      isEdittingProps={{
                        index,
                        handleChange,
                        field: true,
                      }}
                      value={
                        isEditting
                          ? tableRvCopy[index].idealPorcentage
                          : data.idealPorcentage
                      }
                      hasPercentage={!hide}
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      value={data.currentPorcentage}
                      hasPercentage={!hide}
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      value={
                        isEditting
                          ? tableRvCopy[index].stockAmount
                          : data.stockAmount
                      }
                      isEditting={isEditting}
                      isEdittingProps={{
                        index,
                        handleChange,
                        field: false,
                      }}
                    />
                  </TableBodyData>
                  <TableBodyData>
                    <TableCell
                      isHidding={hide}
                      value={`${data.shouldBuyAmount}`}
                    />
                  </TableBodyData>
                  <TableBodyData
                    className={
                      data.status === "Comprar"
                        ? "table__body-data_green"
                        : "table__body-data_red"
                    }
                  >
                    <TableCell isHidding={hide} value={`${data.status}`} />
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

export default RvTable;
