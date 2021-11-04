import styled, { css } from "styled-components";

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

    min-width: 13.2rem;

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
    gap: ${theme.spacings.xxsmall};

    & > .save-btn {
      background: ${theme.colors.yellow};
      color: ${theme.colors.black};
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    max-width: 8rem;
    padding: ${theme.spacings.xxsmall};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};

    text-align: center;
  `}
`;
