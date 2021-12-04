import styled, { css } from "styled-components";
import { WrapperProps } from ".";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    width: 100%;
    height: 100%;
    position: relative;
  `}
`;

export const WaveImg = styled.img`
  position: fixed;
  bottom: 0;
  width: 100%;
  pointer-events: none;
`;

export const Content = styled.section<Pick<WrapperProps, "zeroIndex">>`
  ${({ theme, zeroIndex }) => css`
    position: absolute;
    min-width: 30rem;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${zeroIndex ? 0 : theme.layers.base};
  `}
`;
