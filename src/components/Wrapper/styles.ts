import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    width: 100%;
    height: 100%;
    position: relative;
  `}
`;

export const WaveImg = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
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
  `}
`;
