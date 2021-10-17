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

export const ButtonsWrapper = styled.section`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;

type ButtonsWrapperProps = {
  isAdding?: boolean;
};

export const ActionButtonsWrapper = styled.div<ButtonsWrapperProps>`
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
      padding-top: ${theme.spacings.medium};
      padding-bottom:  ${theme.spacings.medium};
      };

    `}
  `}
`;

export const ToggleContainer = styled.div<ButtonsWrapperProps>`
  ${({ theme }) => css`
    display: flex;

    input {
      position: absolute;
      height: 0;
      width: 0;
      border: 0;

      &:checked + label {
        background-color: ${theme.colors.yellow};
        color: ${theme.colors.black};
        box-shadow: none;
      }
    }

    label {
      cursor: pointer;
      background-color: ${theme.colors.black};
      color: ${theme.colors.lightBlue};
      font-size: ${theme.font.sizes.small};
      text-align: center;
      padding: ${theme.spacings.xsmall} ${theme.spacings.large};
      border: 0.2rem solid ${theme.colors.blue};
      /* box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3),
        0 1px rgba(255, 255, 255, 0.1); */
      transition: all 0.1s ease-in-out;

      &:first-of-type {
        border-radius: ${theme.border.radius} 0 0 ${theme.border.radius};
      }

      &:last-of-type {
        border-radius: 0 ${theme.border.radius} ${theme.border.radius} 0;
      }
    }
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
