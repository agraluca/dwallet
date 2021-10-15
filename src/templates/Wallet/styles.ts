import { Wrapper as CardBalance } from "components/CardBalance/styles";
import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.main`
  ${({ theme }) => css`
    margin: 0 auto;
    padding: 0 calc(${theme.spacings.medium} * 2);

    ${media.lessThan("medium")`
      padding: 0 ${theme.spacings.xxsmall};
    `}
  `}
`;

export const CardWrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: calc(${theme.grid.gutter} * 2);

    ${media.lessThan("medium")`
      gap: ${theme.spacings.small};
    `}

    ${media.lessThan("large")`
      overflow-x: auto;
      padding-bottom: ${theme.spacings.xsmall};

      &::-webkit-scrollbar {
        height: 1rem;

      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.lightBlue};
        border-radius: ${theme.border.radius};
      }

      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.yellow};
        border-radius: ${theme.border.radius};
      }

      ${CardBalance} {
        max-height: 15rem;
        min-width: 30rem;
      }

    `}
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

    ${media.lessThan("medium")`
      justify-content: center;
      flex-direction: column;
    `}
  `}
`;

export const TableWrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;

    ${media.lessThan("large")`
      overflow: auto;
      &::-webkit-scrollbar {
        height: 1rem;

      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.lightBlue};
        border-radius: ${theme.border.radius};
      }

      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.yellow};
        border-radius: ${theme.border.radius};
      }
    `}
  `}
`;
