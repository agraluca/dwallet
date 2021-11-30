import styled, { css } from "styled-components";
import media from "styled-media-query";

export const TableWrapper = styled.table`
  ${({ theme }) => css`
    border-collapse: separate;
    border-spacing: 0 ${theme.spacings.xxsmall};
    width: 100%;

    &.table__wrapper--isAdding {
      margin-bottom: ${theme.spacings.medium};
    }
  `}
`;

export const TableBody = styled.tbody`
  ${() => css``}
`;

export const TableRow = styled.tr`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    border-radius: ${theme.border.radius};
    text-align: center;
    height: 6.4rem;
  `}
`;

export const TableAddingRow = styled.tr`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    border-radius: ${theme.border.radius};
    text-align: center;
    height: 6.4rem;

    & .table__body-button-container {
      padding: 0;
    }

    & .table__body-button {
      color: ${theme.colors.white};
      background: ${theme.colors.green};
      border: none;
      height: 6.4rem;
      width: 100%;
      border-radius: 0;
      border-top-right-radius: 0.8rem;
      border-bottom-right-radius: 0.8rem;

      &:hover {
        background: ${theme.colors.green};
        opacity: 0.9;
      }
    }
  `}
`;

export const TableBodyData = styled.td`
  ${({ theme }) => css`
    color: ${theme.colors.lightBlack};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    padding: 0 ${theme.spacings.medium};

    .remove-item {
      color: ${theme.colors.red};
      cursor: pointer;
    }

    &:first-child {
      border-top-left-radius: ${theme.border.radius};
      border-bottom-left-radius: ${theme.border.radius};
    }

    &:last-child {
      border-top-right-radius: ${theme.border.radius};
      border-bottom-right-radius: ${theme.border.radius};
    }

    &.table__body-data_green {
      color: ${theme.colors.green};
    }

    &.table__body-data_red {
      color: ${theme.colors.red};
    }
  `}
`;

export const EditingWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding-bottom: ${theme.spacings.small};
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.spacings.xsmall};

    & .save-btn {
      background: ${theme.colors.black};
      color: ${theme.colors.blue};
      transition: filter 0.2s;
      font-size: ${theme.font.sizes.small};

      &:hover {
        filter: brightness(0.8);
      }
    }

    ${media.lessThan("medium")`
      justify-content: flex-start;
    `}
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    border: 0.2rem solid ${theme.colors.lightBlue};
    border-radius: ${theme.border.radius};
    width: 7rem;
    font-family: ${theme.font.family};
    text-align: center;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.font.sizes.xsmall} 0;
    font-weight: ${theme.font.weight.bold};
    outline: none;
    margin-right: ${theme.spacings.xxsmall};
    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.blue};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  `}
`;
