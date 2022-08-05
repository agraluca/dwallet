import styled, { css, DefaultTheme } from "styled-components";
import { InputProps } from ".";

type InputWrapperProps = Pick<InputProps, "inputSize" | "error">;

const WrapperModifier = {
  normal: () => css`
    width: 27.8rem;
    height: 4.8rem;
  `,
  large: () => css`
    width: 32.9rem;
    height: 4.2rem;
  `,
  full: () => css`
    width: 100%;
    height: 4.8rem;
  `,
  search: (theme: DefaultTheme) => css`
    width: 27.8rem;
    height: 6.4rem;
    margin-bottom: ${theme.spacings.medium};
  `,
};

export const Wrapper = styled.section<InputWrapperProps>`
  ${({ inputSize }) => css`
    display: flex;
    flex-direction: column;
    width: ${inputSize === "full" && "100%"};
  `}
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme, inputSize, error }) => css`
    display: flex;
    align-items: center;
    margin-bottom: ${error ? "0" : `${theme.spacings.xsmall}`};
    background: ${theme.colors.white};
    border-radius: ${theme.border.radius};

    ${!!inputSize && WrapperModifier[inputSize!](theme)}

    img {
      width: 2.4rem;
      height: 2.4rem;
      margin-left: ${theme.spacings.xsmall};
    }
    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.yellow};
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border: none;
    background: transparent;
    padding: ${theme.spacings.xsmall} ${theme.spacings.xsmall}
      ${theme.spacings.xsmall} ${theme.spacings.xxsmall};

    width: inherit;
    height: inherit;
    font-weight: lighter;
    font-size: 1.8rem;
    outline: none;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 ${theme.spacings.small} ${theme.colors.white}
        inset;
      border-radius: ${theme.border.radius};
      filter: none;
    }
  `}
`;
type ErrorProps = {
  error?: string;
};
export const Error = styled.p<ErrorProps>`
  ${({ theme, error }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.medium};
    margin: ${error ? `${theme.spacings.xxsmall}` : "0"};
  `}
`;
