import * as S from "./styles";

type TableHeaderColumnProps = {
  name: string;
  className?: string;
};

type TableHeaderProps = {
  columns: TableHeaderColumnProps[];
};

export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <S.TableHeader>
      <S.TableHeaderRow>
        {columns.map((item, index) => (
          <S.TableHeaderData
            key={index}
            {...(item?.className ? { className: `${item.className}` } : {})}
          >
            {item.name}
          </S.TableHeaderData>
        ))}
      </S.TableHeaderRow>
    </S.TableHeader>
  );
}
