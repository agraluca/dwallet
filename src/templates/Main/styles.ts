import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    width: 100%;
    height: 100%;
    padding: ${theme.spacings.medium};
    display: flex;
    justify-content: center;
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
  flex-direction: column;

  ${media.lessThan("large")`
    justify-content: center;
    align-items: center;
  `}
`;

export const IlustrationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Illustration = styled.img`
  width: min(30rem, 100%);

  ${media.lessThan("large")`
    display: none;
  `}
`;

export const WaveIllustration = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
`;

export const Button = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 40rem;
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xsmall};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.weight.normal};
    cursor: pointer;
    transition: filter 0.2s;
    margin-top: ${theme.spacings.small};
    border: 0.2rem solid ${theme.colors.white};
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};

    .login--google-logo {
      width: 2.8rem;
      height: 2.8rem;
    }

    &:hover {
      filter: brightness(0.8);
    }

    ${media.lessThan("medium")`
      width: 100%;
   `}
  `}
`;
