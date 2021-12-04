import { ReactNode } from "react";
import { Times } from "@styled-icons/fa-solid/Times";

import * as S from "./styles";

interface ModalProps {
  size?: "sm" | "md" | "lg";
  title?: string;
  noBorders?: boolean;
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
}

function Modal({
  size = "md",
  title,
  noBorders = true,
  children,
  onClose,
  isOpen,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <S.Wrapper size={size} noBorders={noBorders}>
      <S.ModalWrapper>
        <S.ModalHeader hasTitle={!!title}>
          {title && <S.Title>{title}</S.Title>}
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
