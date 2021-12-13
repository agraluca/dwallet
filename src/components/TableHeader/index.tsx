import ReactTooltip from "react-tooltip";
import * as S from "./styles";

type TableHeaderColumnProps = {
  name: string;
  className?: string;
};

type TableHeaderProps = {
  columns: TableHeaderColumnProps[];
  totalIdealPercentage: number;
};

export default function TableHeader({
  columns,
  totalIdealPercentage,
}: TableHeaderProps) {
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
                <p
                  data-for="header__total-ideal-percentage"
                  data-tip={`Total: ${totalIdealPercentage}%`}
                >
                  {item.name}{" "}
                </p>
                <ReactTooltip
                  id="header__total-ideal-percentage"
                  className="tooltip"
                  type="light"
                />
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
