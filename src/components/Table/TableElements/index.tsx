import { ChangeEvent, ReactNode } from "react";
import { Button } from "components/Button";
import * as S from "./style";
import { TableDataRfProps } from "../RfTable";
import { TableDataRvProps } from "../RvTable";

interface TableElementsProps {
  children: ReactNode;
}

export type TableElementWithClassnameProps = {
  className?: string;
  isHidding?: boolean;
} & TableElementsProps;

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

interface DeleteModalContentProps {
  data: TableDataRvProps | TableDataRfProps;
  name: "rv" | "rf";
  onConfirm: () => void;
  onCancel: () => void;
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
  isHidding = false,
}: TableElementWithClassnameProps) => (
  <S.TableBodyData isHidding={isHidding} className={className}>
    {children}
  </S.TableBodyData>
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
        className="input--centered"
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

export const DeleteModalContent = ({
  data,
  name = "rv",
  onConfirm,
  onCancel,
}: DeleteModalContentProps) => {
  const content =
    name === "rv" ? (
      <>
        <S.DeleteModalContentWrapper>
          <span>
            <b>Nome:</b> {(data as TableDataRvProps).stock}
          </span>
          <span>
            <b>Tipo:</b> {(data as TableDataRvProps).type}
          </span>
          <span>
            <b>Preço:</b> {(data as TableDataRvProps).price}
          </span>
          <span>
            <b>% Ideal:</b> {(data as TableDataRvProps).idealPorcentage} %
          </span>
          <span>
            <b>% Atual:</b> {(data as TableDataRvProps).currentPorcentage} %
          </span>
          <span>
            <b>Quantidade:</b> {(data as TableDataRvProps).stockAmount}
          </span>
        </S.DeleteModalContentWrapper>
      </>
    ) : (
      <div>rf</div>
    );

  return (
    <>
      {content}
      <S.DeleteModalButtonGroup>
        <S.ConfirmButton onClick={onConfirm}>
          SIM, QUERO DELETAR
        </S.ConfirmButton>
        <S.CancelButton onClick={onCancel}>
          NÃO, QUERO MANTER ESTE ATIVO
        </S.CancelButton>
      </S.DeleteModalButtonGroup>
    </>
  );
};
