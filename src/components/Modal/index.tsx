import { ReactNode } from "react";
import { Times } from "@styled-icons/fa-solid/Times";
import { Trash } from "@styled-icons/boxicons-regular/Trash";
import { MessageSquareEdit } from "@styled-icons/boxicons-regular/MessageSquareEdit";
import { MessageSquareAdd } from "@styled-icons/boxicons-regular/MessageSquareAdd";

import * as S from "./styles";
import theme from "styles/theme";

export interface ModalProps {
  size?: "sm" | "md" | "lg";
  title?: string;
  noBorders?: boolean;
  leftBorder?: boolean;
  icon?: boolean;
  type?: "delete" | "update" | "add";
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
}

function Modal({
  size = "md",
  title,
  noBorders = true,
  leftBorder = false,
  icon = false,
  type = "delete",
  children,
  onClose,
  isOpen,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const iconTypes = {
    delete: <Trash />,
    update: <MessageSquareEdit />,
    add: <MessageSquareAdd />,
  };

  const colorType = {
    delete: theme.colors.red,
    update: theme.colors.yellow,
    add: theme.colors.blue,
  };

  return (
    <S.Wrapper size={size} noBorders={noBorders}>
      <S.ModalWrapper colorType={leftBorder ? colorType[type] : "transparent"}>
        <S.ModalHeader hasTitle={!!title}>
          {title && <S.Title>{title}</S.Title>}
          {icon && (
            <S.IconTypeWrapper colorType={colorType[type]}>
              {iconTypes[type]}
            </S.IconTypeWrapper>
          )}
          <S.CloseButton onClick={onClose}>
            <Times width={25} height={25} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalWrapper>
    </S.Wrapper>
  );
}

export default Modal;
