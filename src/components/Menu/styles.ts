import styled, { css } from "styled-components";

type MenuFullProps = {
  isOpen: boolean;
};

export const MenuWrapper = styled.header`
  ${({ theme }) => css`
    max-width: ${theme.grid.container};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(${theme.spacings.small} * 2) ${theme.spacings.medium}
      calc(${theme.spacings.medium} * 2) ${theme.spacings.medium};
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

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.white};
    width: 2.4rem;
    height: 2.4rem;
  `}
`;

export const LogoWrapper = styled.section`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const MenuFull = styled.nav<MenuFullProps>`
  ${({ theme, isOpen }) => css`
    z-index: ${theme.layers.alwaysOnTop};
    visibility: ${isOpen ? "visible" : "hidden"};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    opacity: ${isOpen ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
    pointer-events: ${isOpen ? "all" : "none"};
    background: ${theme.colors.black};

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;

    .fullMenu__close-icon {
      fill: ${theme.colors.white};
      position: absolute;
      top: 0;
      right: 0;
      margin: ${theme.spacings.xsmall};
      cursor: pointer;
      width: 2.4rem;
      height: 2.4rem;
    }
    ${NavWrapper} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
    ${LogoWrapper} {
      display: flex;
    }
  `}
`;
