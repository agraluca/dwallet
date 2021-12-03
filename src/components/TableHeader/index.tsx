import { TableDataRvProps } from "components/Table/RvTable";
import ReactTooltip from "react-tooltip";
import * as S from "./styles";

type TableHeaderColumnProps = {
  name: string;
  className?: string;
};

type TableHeaderProps = {
  columns: TableHeaderColumnProps[];
  tableDataRv?: TableDataRvProps[];
};

export default function TableHeader({
  columns,
  tableDataRv,
}: TableHeaderProps) {
  const totalIdealPercentage = tableDataRv?.reduce((acc, cur) => {
    acc += cur.idealPorcentage;
    return acc;
  }, 0);

  return (
    <S.TableHeader>
      <S.TableHeaderRow>
        {columns.map((item, index) => (
          <S.TableHeaderData
            key={index}
            {...(item?.className ? { className: `${item.className}` } : {})}
          >
            {item.name === "% Ideal" ? (
              <>
                <p data-tip={`Total: ${totalIdealPercentage}%`}>{item.name} </p>
                <ReactTooltip className="tooltip" type="light" />
              </>
            ) : (
              item.name
            )}
          </S.TableHeaderData>
        ))}
      </S.TableHeaderRow>
    </S.TableHeader>
  );
}
