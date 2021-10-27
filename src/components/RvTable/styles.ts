import styled, { css } from "styled-components";

export const SaveButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: ${theme.spacings.medium};

    & .save-btn__editing {
      background: ${theme.colors.black};
      color: ${theme.colors.blue};
      transition: filter 0.2s;
      font-size: ${theme.font.sizes.small};

      &:hover {
        filter: brightness(0.8);
      }
    }
  `}
`;

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

export const TableHeader = styled.thead`
  ${() => css``}
`;

export const TableHeaderRow = styled.tr`
  ${() => css``}
`;

export const TableHeaderData = styled.th`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    padding-bottom: ${theme.spacings.small};
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

    & .input--centered {
      width: 7rem;
      font-family: ${theme.font.family};
      text-align: center;
      font-size: ${theme.font.sizes.medium};
      padding: ${theme.font.sizes.xsmall} 0;
      font-weight: ${theme.font.weight.bold};
      outline: none;
      margin-right: ${theme.spacings.xxsmall};
      &:focus-within {
        box-shadow: 0 0 0.5rem ${theme.colors.yellow};
      }
    }
  `}
`;

export const InputSymbol = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 ${theme.spacings.xsmall};
  `}
`;

export const SaveButton = styled.button``;
