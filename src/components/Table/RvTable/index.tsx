import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { ChangeEvent, useState, useEffect } from "react";
import { formatNumberToBrlCurrency, typeCheck } from "utils";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import TableHeader from "components/TableHeader";
import {
  alreadyExistsInList,
  hasOverLimit,
  existZeroValueInIdealPercentage,
} from "utils/functions";
import { Times } from "@styled-icons/fa-solid/Times";

import {
  TableWrapper,
  TableBody,
  TableAddingRow,
  TableBodyData,
  IsEdittingMenu,
  TableRow,
  TableCell,
  DeleteModalContent,
} from "../TableElements/index";

import toast from "react-hot-toast";
import Toast from "components/Toast";
import { getDetailStock } from "store/fetchActions/fetchStocks";
import {
  addVariableIncomeToUserWallet,
  editVariableIncomeWallet,
  removeItemFromVariableIncomeWallet,
} from "store/fetchActions/fetchWallet";
import Modal from "components/Modal";
import { useModal } from "hooks/useModal";

export type TableDataRvProps = {
  stock: string;
  type: string;
  price: number;
  idealPorcentage: number;
  currentPorcentage: number;
  stockAmount: number;
  shouldBuyAmount: number;
  status: string;
  _id?: string;
};

export type TableProps = {
  tableDataRv: TableDataRvProps[];
  isAdding: boolean;
  setIsAdding: () => void;
  hide?: boolean;
  isEditting: boolean;
  handleCancelIsEditting: () => void;
};

const tableFormValuesInitialValues = {
  ticker: "",
  type: "",
  price: "",
  idealPorcentage: "",
  quantity: "",
  total: "",
};

function RvTable({
  tableDataRv,
  isAdding,
  setIsAdding,
  hide = false,
  isEditting = false,
  handleCancelIsEditting,
}: TableProps) {
  const columnsVariableIncomeTable = isEditting
    ? [
        { name: "" },
        { name: "Ticker" },
        { name: "Tipo" },
        { name: "Preço" },
        { name: "% Ideal" },
        { name: "% Atual" },
        { name: "Qtd" },
        { name: "Qtd p/ comprar" },
        { name: "Status" },
      ]
    : [
        { name: "Ticker" },
        { name: "Tipo" },
        { name: "Preço" },
        { name: "% Ideal" },
        { name: "% Atual" },
        { name: "Qtd" },
        { name: "Qtd p/ comprar" },
        { name: "Status" },
      ];

  const [tableFormValues, setTableFormValues] = useState(
    tableFormValuesInitialValues
  );

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const [tableRvCopy, setTableRvCopy] = useState([...tableDataRv]);
  const [deleteStock, setDeleteStock] = useState<TableDataRvProps>();

  const dispatch = useAppDispatch();
  const { getDetailStockLoading } = useAppSelector((state) => state.loading);

  const exists = alreadyExistsInList<TableDataRvProps>(
    tableFormValues.ticker,
    "stock",
    tableDataRv
  );

  useEffect(() => {
    setTableRvCopy([...tableDataRv]);
  }, [isEditting, tableDataRv]);

  useEffect(() => {
    if (!isAdding) {
      setTableFormValues(tableFormValuesInitialValues);
    }
  }, [isAdding]);

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
    const data = await dispatch(getDetailStock(tableFormValues.ticker));
    if (data) {
      const { tickerType, formattedPrice } = data;

      const alreadyExists = alreadyExistsInList(
        data.tickerName,
        "stock",
        tableDataRv
      );
      if (alreadyExists) {
        toast.custom(
          <Toast title="Já existe esse ativo em sua carteira." type="error" />,
          { position: "top-right" }
        );
      }
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
    if (Number(tableFormValues.idealPorcentage) === 0) {
      toast.custom(
        <Toast title="Porcentagem ideal não pode ser 0%" type="error" />,
        { position: "top-right" }
      );

      return;
    }

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

    const alreadyExists = alreadyExistsInList(
      newValue.stock,
      "stock",
      tableDataRv
    );

    const overLimit = hasOverLimit(tableDataRv, 100, newValue.idealPorcentage);

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
    dispatch(addVariableIncomeToUserWallet(newValue));

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
    setTableFormValues(tableFormValuesInitialValues);
    handleCancelIsEditting();
    setTableRvCopy([...tableDataRv]);
  };

  const onSave = () => {
    const overLimit = hasOverLimit(tableRvCopy, 100);
    const hasZeroValueInIdealPercentage =
      existZeroValueInIdealPercentage(tableRvCopy);

    if (hasZeroValueInIdealPercentage) {
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

    dispatch(editVariableIncomeWallet(tableRvCopy));
    handleCancelIsEditting();
    setTableRvCopy([...tableDataRv]);
  };

  const handleDelete = () => {
    dispatch(removeItemFromVariableIncomeWallet(deleteStock!._id!));

    handleCloseModal();
    setDeleteStock(undefined);
    handleCancelIsEditting();
  };

  const handleCancelDelete = () => {
    setDeleteStock(undefined);
    handleCloseModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Tem certeza que deletar este ativo?"
        onClose={handleCloseModal}
        size="md"
      >
        <DeleteModalContent
          name="rv"
          data={deleteStock!}
          onCancel={handleCancelDelete}
          onConfirm={handleDelete}
        />
      </Modal>
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
                  loading={getDetailStockLoading}
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
          <TableHeader
            columns={columnsVariableIncomeTable}
            tableDataRv={tableDataRv}
          />

          <TableBody>
            {tableDataRv.map((data, index) => {
              return (
                <TableRow key={data._id}>
                  {isEditting && (
                    <TableBodyData>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setDeleteStock(data);
                          handleOpenModal();
                        }}
                      >
                        <Times className="remove-item" width={20} height={20} />
                      </button>
                    </TableBodyData>
                  )}

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
                    isHidding={hide}
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
