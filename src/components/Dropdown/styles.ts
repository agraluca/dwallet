import styled, { css } from "styled-components";

type WrapperProps = {
  isOpen?: boolean;
};

const WrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
    transform: translateY(-2rem);
  `,
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isOpen }) => css`
    width: max-content;
    z-index: ${theme.layers.modal};
    ${Content} {
      transition: opacity 0.3s ease-in-out;
      transition: transform 0.2s ease-in;
      ${isOpen && WrapperModifiers.open()}
      ${!isOpen && WrapperModifiers.close()}
    }
    & .user-dropdown--accountCircle {
      color: ${theme.colors.yellow};
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.white};

    position: relative;
    display: flex;
    align-items: center;
  `}
`;

export const Content = styled.div<WrapperProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    margin-top: ${theme.spacings.medium};
    font-size: ${theme.font.sizes.medium};
    position: absolute;
    right: 0;
    top: 5rem;
    visibility: ${isOpen ? "visible" : "hidden"};
    &:hover::before {
      border-bottom: 1.2rem solid ${theme.colors.yellow};
    }

    &::before {
      content: "";
      position: absolute;
      border-right: 1.2rem solid transparent;
      border-left: 1.2rem solid transparent;
      border-bottom: 1.2rem solid ${theme.colors.white};
      top: -1.2rem;
      right: 2.4rem;
      transition: all 0.3s ease-in-out;
    }
  `}
`;
