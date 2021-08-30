import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.blue};
    border: 0.2rem solid ${theme.colors.blue};
    padding: ${theme.spacings.xsmall} ${theme.spacings.large};
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.weight.bold};
    cursor: pointer;

    &:hover {
      background: radial-gradient(
        50% 50% at 50% 50%,
        ${theme.colors.black} 0%,
        ${theme.colors.lightBlack} 100%
      );
    }
  `}
`;

export const IconButton = styled(Button)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.xsmall};
  `}
`;

export const Icon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;
