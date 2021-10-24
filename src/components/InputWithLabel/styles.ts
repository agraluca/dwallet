import styled, { css } from "styled-components";

export const Label = styled.label`
  ${({ theme }) => css`
    width: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: ${theme.colors.lightBlack};
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.weight.bold};
    gap: ${theme.spacings.xxsmall};
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 10rem;
    outline: none;
    border: none;
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.weight.bold};
    background-color: transparent;
    color: ${theme.colors.lightBlack};

    &::placeholder {
      color: ${theme.colors.lightBlack};
    }

    & ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      -moz-appearance: textfield;
    }
  `}
`;
