import styled, { css } from "styled-components";

export const TableWrapper = styled.table`
  ${({ theme }) => css`
    border-collapse: separate;
    border-spacing: 0 ${theme.spacings.xxsmall};
    width: 100%;
  `}
`;

export const TableHeader = styled.thead`
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

export const TableBodyData = styled.td`
  ${({ theme }) => css`
    color: ${theme.colors.lightBlack};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.bold};
    padding: 0 ${theme.spacings.large};

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
