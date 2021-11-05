import styled, { css } from "styled-components";

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
