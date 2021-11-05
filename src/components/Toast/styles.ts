import styled, { css, DefaultTheme } from "styled-components";
import { ToastProps } from ".";

const typeModifiers = {
  success: (theme: DefaultTheme) => css`
    border-left: 0.5rem solid ${theme.colors.green};
    color: ${theme.colors.green};
  `,

  error: (theme: DefaultTheme) => css`
    border-left: 0.5rem solid ${theme.colors.red};
    color: ${theme.colors.red};
  `,

  warning: (theme: DefaultTheme) => css`
    border-left: 0.5rem solid ${theme.colors.yellow};
    color: ${theme.colors.yellow};
  `,

  info: (theme: DefaultTheme) => css`
    border-left: 0.5rem solid ${theme.colors.blue};
    color: ${theme.colors.blue};
  `,
};

export const Wrapper = styled.section<Pick<ToastProps, "type">>`
  ${({ theme, type }) => css`
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    border-radius: ${theme.border.radius};
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0.8rem 3.2rem 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(0.75rem);
    -webkit-backdrop-filter: blur(0.75rem);
    border: 0.1rem solid rgba(255, 255, 255, 0.18);

    ${!!type && typeModifiers[type!](theme)}
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
  `}
`;
