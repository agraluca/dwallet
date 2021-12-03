import styled, { css } from "styled-components";

export const Wrapper = styled.svg`
  ${({ theme }) => css`
    stroke: ${theme.colors.yellow};
    padding: 0.1rem;
    margin: 0.2rem;
  `}
`;
