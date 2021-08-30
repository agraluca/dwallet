import { formatNumberToBrlCurrency } from "utils";
import * as S from "./styles";

const tableData = [
  {
    stock: "ABEV3",
    type: "Ação",
    price: 30,
    idealPorcentage: 8,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 10,
    status: "Comprar",
  },
  {
    stock: "HGLG11",
    type: "FII",
    price: 110,
    idealPorcentage: 8,
    currentPorcentage: 5,
    stockAmount: 10,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
  {
    stock: "BIDI3",
    type: "Ação",
    price: 40,
    idealPorcentage: 4,
    currentPorcentage: 5,
    stockAmount: 50,
    shouldBuyAmount: 0,
    status: "Segurar",
  },
];

export type TableDataProps = {
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
  tableData: TableDataProps[];
};

function Table(/* { tableData }: TableProps */) {
  return (
    <S.TableWrapper>
      {tableData?.length && (
        <>
          <S.TableHeader>
            <S.TableHeaderData>Thicker</S.TableHeaderData>
            <S.TableHeaderData>Tipo</S.TableHeaderData>
            <S.TableHeaderData>Preço</S.TableHeaderData>
            <S.TableHeaderData>% Ideal</S.TableHeaderData>
            <S.TableHeaderData>% Atual</S.TableHeaderData>
            <S.TableHeaderData>Qtd</S.TableHeaderData>
            <S.TableHeaderData>Qtd p/ comprar</S.TableHeaderData>
            <S.TableHeaderData>Status</S.TableHeaderData>
          </S.TableHeader>
          <S.TableBody>
            {tableData?.map((data, index) => {
              return (
                <S.TableRow key={index}>
                  <S.TableBodyData>{data.stock.toUpperCase()}</S.TableBodyData>
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
  );
}

export default Table;
