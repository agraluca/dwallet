import styled, { css } from "styled-components";

export const ChartWrapper = styled.section`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.medium};
  `}
`;
