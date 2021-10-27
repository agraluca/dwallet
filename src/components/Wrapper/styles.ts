import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    position: relative;
    width: 100%;
    height: 100%;
  `}
`;

export const WaveImg = styled.img`
  position: fixed;
  bottom: 0;
  width: 100%;
  pointer-events: none;
`;

export const Content = styled.section`
  ${({ theme }) => css`
    position: absolute;
    max-width: ${theme.grid.container};
    min-width: 30rem;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${theme.layers.base};
  `}
`;
