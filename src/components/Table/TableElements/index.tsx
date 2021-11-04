import { ChangeEvent, ReactNode } from "react";
import { Button } from "components/Button";

import * as S from "./style";

interface TableElementsProps {
  children: ReactNode;
}

interface TableElementWithClassnameProps extends TableElementsProps {
  className?: string;
}

interface IsEdittingMenuProps {
  onCancel: () => void;
  onSave: () => void;
}

interface TableCellIsEdittingProps {
  index: number;
  handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    field: boolean
  ) => void;
  field: boolean;
}

interface TableCellProps {
  value: string | number;
  isHidding: boolean;
  isEditting?: boolean;
  hasPercentage?: boolean;
  isEdittingProps?: TableCellIsEdittingProps;
}

export const TableWrapper = ({
  children,
  className,
}: TableElementWithClassnameProps) => (
  <S.TableWrapper className={className}>{children}</S.TableWrapper>
);

export const TableBody = ({ children }: TableElementsProps) => (
  <S.TableBody>{children}</S.TableBody>
);

export const TableRow = ({ children }: TableElementsProps) => (
  <S.TableRow>{children}</S.TableRow>
);

export const TableAddingRow = ({ children }: TableElementsProps) => (
  <S.TableAddingRow>{children}</S.TableAddingRow>
);

export const TableBodyData = ({
  children,
  className,
}: TableElementWithClassnameProps) => (
  <S.TableBodyData className={className}>{children}</S.TableBodyData>
);

export const IsEdittingMenu = ({ onCancel, onSave }: IsEdittingMenuProps) => {
  return (
    <S.EditingWrapper>
      <Button className="save-btn" onClick={onSave}>
        Salvar
      </Button>
      <Button onClick={onCancel}>Cancelar</Button>
    </S.EditingWrapper>
  );
};

export const TableCell = ({
  isHidding = false,
  value,
  isEditting = false,
  hasPercentage = false,
  isEdittingProps,
}: TableCellProps) => {
  if (isEditting) {
    return (
      <S.Input
        type="number"
        value={value}
        onChange={(event) =>
          isEdittingProps?.handleChange(
            event,
            isEdittingProps?.index,
            isEdittingProps?.field
          )
        }
      />
    );
  }

  return (
    <>
      {isHidding ? " - " : value}
      {hasPercentage && "%"}
    </>
  );
};
