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
    position: fixed;
    inset: 0;
    z-index: ${theme.layers.modal};

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

export const ModalWrapper = styled.div<IconTypeColorProps>`
  ${({ theme, colorType }) => css`
    height: auto;
    background: ${theme.colors.white};
    border-radius: ${theme.spacings.xxsmall};
    box-shadow: rgba(255, 255, 255, 0.2) 0 0.7rem 3rem 0;
    position: relative;

    &::before {
      content: "";
      width: 4rem;
      height: 100%;
      background-color: ${colorType};
      border-radius: ${theme.border.radius} 0 0 ${theme.border.radius};
      position: absolute;
      top: 0;
      bottom: 0;
    }
  `}
`;

export const ModalHeader = styled.header<ModalHeaderProps>`
  ${({ theme, hasTitle }) => css`
    padding: ${hasTitle ? theme.spacings.xsmall : theme.spacings.xxsmall};
    display: flex;
    justify-content: ${hasTitle ? "space-between" : "flex-end"};
    align-items: center;
    position: relative;
  `}
`;

type IconTypeColorProps = {
  colorType?: string;
};

export const IconTypeWrapper = styled.div<IconTypeColorProps>`
  ${({ theme, colorType }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      color: ${colorType};
      position: absolute;
      left: 0;
      right: 0;
      top: -3rem;
      margin: 0 auto;
      width: 10rem;
      height: 10rem;
      padding: ${theme.spacings.xxsmall};
      border-radius: 100%;
      background-color: ${theme.colors.white};
    }
  `}
`;

export const Title = styled.h3`
  flex: 1;
  text-overflow: ellipsis;
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    padding: 1rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }

    & svg {
      color: ${theme.colors.gray};
    }
  `}
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xsmall};
  `}
`;
