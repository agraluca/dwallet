import { ChangeEvent, ReactNode } from "react";
import { Button } from "components/Button";
import * as S from "./style";
import { TableDataRfProps } from "../RfTable";
import { TableDataRvProps } from "../RvTable";
import ReactTooltip from "react-tooltip";
import { typeCheck } from "utils";

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
  field?: string;
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
  field,
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
      {isHidding ? (
        " - "
      ) : field === "type" ? (
        <>
          <p
            data-for="table-cell__type"
            data-tip={`${typeCheck(value as string)}`}
          >
            {" "}
            {value}{" "}
          </p>
          <ReactTooltip
            id="table-cell__type"
            className="tooltip-dark"
            type="dark"
          />
        </>
      ) : (
        value
      )}
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
  const incomeName =
    name === "rv" ? data.stock.toUpperCase() : data.name.toUpperCase();
  const content =
    name === "rv" ? (
      <>
        <S.DeleteModalContentWrapper>
          <S.ModalTitle>Você esta prestes a deletar esse ativo</S.ModalTitle>
          <S.ModalSubTitle>
            Essa ação irá deletar o ativo{" "}
            <S.StrongIncome>{incomeName}</S.StrongIncome> da sua carteira
          </S.ModalSubTitle>
          <S.AreUSure>Você tem certeza?</S.AreUSure>
        </S.DeleteModalContentWrapper>
      </>
    ) : (
      <S.DeleteModalContentWrapper>
        <S.ModalTitle>Você esta prestes a deletar esse ativo</S.ModalTitle>
        <S.ModalSubTitle>
          Essa ação irá deletar o ativo{" "}
          <S.StrongIncome>{incomeName}</S.StrongIncome> da sua carteira
        </S.ModalSubTitle>
        <S.AreUSure>Você tem certeza?</S.AreUSure>
      </S.DeleteModalContentWrapper>
    );

  return (
    <>
      {content}
      <S.DeleteModalButtonGroup>
        <S.CancelButton onClick={onCancel}>Cancelar</S.CancelButton>
        <S.ConfirmButton onClick={onConfirm}>Deletar</S.ConfirmButton>
      </S.DeleteModalButtonGroup>
    </>
  );
};
