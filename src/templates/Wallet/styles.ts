import styled, { css } from "styled-components";

export const Container = styled.main`
  ${({ theme }) => css`
    margin: 0 auto;
    padding: 0 calc(${theme.spacings.medium} * 2)
      calc(${theme.spacings.medium} * 2);
  `}
`;

export const CardWrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: calc(${theme.grid.gutter} * 2);
  `}
`;
type ButtonsWrapperProps = {
  isAdding?: boolean;
};
export const ButtonsWrapper = styled.section<ButtonsWrapperProps>`
  ${({ theme, isAdding }) => css`
    display: flex;
    gap: ${theme.grid.gutter};
    padding-top: calc(${theme.spacings.medium} * 2);
    padding-bottom: ${isAdding
      ? theme.spacings.medium
      : `calc(${theme.spacings.medium} * 2)`};
  `}
`;
