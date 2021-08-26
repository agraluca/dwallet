import styled, { css } from "styled-components";

export const MenuWrapper = styled.header`
  ${({ theme }) => css`
    max-width: ${theme.grid.container};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(${theme.spacings.small} * 2) 0
      calc(${theme.spacings.medium} * 2) 0;
    position: relative;
  `}
`;

export const NavWrapper = styled.nav`
  ${({ theme }) => css`
    display: flex;
    gap: calc(${theme.grid.gutter} * 2);
  `}
`;

export const MenuLink = styled.a`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.weight.bold};
    color: ${theme.colors.blue};
    text-decoration: none;
    transition: 0.3s ease-in;

    &:hover {
      color: ${theme.colors.yellow};
    }
  `}
`;

export const LogoWrapper = styled.section`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;
