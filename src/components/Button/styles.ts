import styled, { css } from "styled-components";

interface IconProps {
  iconSize?: "small" | "medium" | "large";
}

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.blue};
    border: 0.2rem solid ${theme.colors.blue};
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
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

    &:disabled {
      cursor: not-allowed;
      filter: brightness(0.8);
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

export const Icon = styled.img<IconProps>`
  ${({ iconSize, theme }) => {
    switch (iconSize) {
      case "small":
        return css`
          width: ${theme.font.sizes.small};
          height: ${theme.font.sizes.small};
        `;
      case "medium":
        return css`
          width: ${theme.font.sizes.medium};
          height: ${theme.font.sizes.medium};
        `;
      case "large":
        return css`
          width: ${theme.font.sizes.large};
          height: ${theme.font.sizes.large};
        `;

      default:
        return css`
          width: ${theme.font.sizes.small};
          height: ${theme.font.sizes.small};
        `;
    }
  }}
`;

export const LoadingDots = styled.img.attrs(() => ({
  src: "/img/dots.svg",
  alt: "Carregando...",
}))`
  width: 4rem;
`;
