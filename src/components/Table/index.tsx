import { Button } from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { formatNumberToBrlCurrency } from "utils";
import * as S from "./styles";

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
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
};

function Table({ tableData, isAdding, setIsAdding }: TableProps) {
  return (
    <>
      {isAdding && (
        <S.TableWrapper className="table__wrapper--isAdding">
          <S.TableBody>
            <S.TableAddingRow>
              <S.TableBodyData>
                <InputWithLabel label="Ticker:" />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel label="Tipo:" placeholder="-" disabled />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="Preço:"
                  placeholder="R$ 00.00"
                  disabled
                />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel label="% Ideal:" />
              </S.TableBodyData>
              <S.TableBodyData>-</S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel label="Qtd:" />
              </S.TableBodyData>
              <S.TableBodyData>
                <InputWithLabel
                  label="Total:"
                  placeholder="R$ 00.00"
                  disabled
                />
              </S.TableBodyData>
              <S.TableBodyData className="table__body-button-container">
                <Button
                  onClick={() => setIsAdding(false)}
                  className="table__body-button"
                >
                  Adicionar
                </Button>
              </S.TableBodyData>
            </S.TableAddingRow>
          </S.TableBody>
        </S.TableWrapper>
      )}

      <S.TableWrapper>
        {tableData?.length && (
          <>
            <S.TableHeader>
              <S.TableHeaderRow>
                <S.TableHeaderData>Thicker</S.TableHeaderData>
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
              {tableData?.map((data, index) => {
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

export default Table;
