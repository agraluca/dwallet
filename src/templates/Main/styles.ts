import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    width: 100%;

    height: 100%;
    padding: ${theme.spacings.medium};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: ${theme.colors.white};
  `}
`;

export const Logo = styled.img`
  width: 10rem;
`;

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    .login--title {
      font-size: calc(${theme.font.sizes.large} * 2);
    }
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.weight.thin};
    line-height: calc(${theme.font.sizes.large} * 1.2);
    max-width: 40rem;
  `}
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  z-index: 50;

  ${media.lessThan("large")`
    justify-content: center;
    align-items: center;
    width: 100%;
  `}
`;

export const IlustrationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  ${media.lessThan("large")`
    display: none;
  `}
`;

export const Illustration = styled.img`
  width: min(40rem, 100%);
  align-self: flex-start;
`;

export const WaveIllustration = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
`;

export const FormLogin = styled.form`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacings.xxsmall};
    flex-direction: column;
    padding: ${theme.spacings.medium} 0;
    max-width: 40rem;
    width: 100%;

    .submitButton {
      width: 100%;
    }
  `}
`;

export const FormLoading = styled.img.attrs(() => ({
  src: "/img/dots.svg",
  alt: "Waiting...",
}))`
  width: 4rem;
`;
