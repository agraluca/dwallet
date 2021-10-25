import styled, { css } from "styled-components";

export const Input = styled.input`
  ${({ theme }) => css`
    width: 10rem;
    border: 0;
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
