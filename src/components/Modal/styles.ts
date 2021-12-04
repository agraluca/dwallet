import styled, { css, DefaultTheme } from "styled-components";

interface ModalSizeProps {
  size: "sm" | "lg" | "md";
  noBorders: boolean;
}

interface ModalHeaderProps {
  hasTitle: boolean;
}

const sizes = {
  sm: "30rem",
  md: "80rem",
  lg: "114rem",
};

const titleSizes = {
  sm: (theme: DefaultTheme) => theme.font.sizes.medium,
  md: (theme: DefaultTheme) => theme.font.sizes.large,
  lg: (theme: DefaultTheme) => theme.font.sizes.xlarge,
};

export const Wrapper = styled.div<ModalSizeProps>`
  ${({ size, theme, noBorders }) => css`
    position: absolute;
    inset: 0;
    z-index: 998;

    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);

    ${ModalWrapper} {
      width: ${sizes[size]};
    }

    ${Title} {
      font-size: ${titleSizes[size](theme)};
    }

    ${ModalHeader} {
      border-bottom: ${noBorders ? 0 : "1px solid rgba(0, 0, 0, 0.2)"};
    }
  `}
`;

export const ModalWrapper = styled.div`
  ${({ theme }) => css`
    height: auto;
    background: ${theme.colors.white};
    border-radius: ${theme.spacings.xxsmall};

    //padding: ${theme.spacings.small};
  `}
`;

export const ModalHeader = styled.header<ModalHeaderProps>`
  ${({ theme, hasTitle }) => css`
    padding: ${hasTitle ? theme.spacings.xsmall : theme.spacings.xxsmall};

    display: flex;
    justify-content: ${hasTitle ? "space-between" : "flex-end"};
    align-items: center;
  `}
`;

export const Title = styled.h3`
  flex: 1;
  text-overflow: ellipsis;
`;

export const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  padding: 1rem;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xsmall};
  `}
`;
