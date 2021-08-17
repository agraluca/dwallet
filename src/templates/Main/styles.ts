import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    width: 100%;
    height: 100%;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  `}

  ${media.lessThan("medium")`
    border: 1px solid red;

    flex-direction: column;

  `}
`;

export const Logo = styled.img`
  width: 10rem;
  margin-bottom: 2rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 6rem;
`;

export const Description = styled.p`
  font-size: 2.8rem;
  font-weight: 400;
  line-height: 4.3rem;
  max-width: 40rem;
  text-align: left;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10rem;

  ${media.lessThan("medium")`
    justify-content: center;
    padding-left: 2rem;
  `}
`;

export const IlustrationWrapper = styled.div`
  flex: 1;

  ${media.lessThan("medium")`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`;

export const WaveIllustration = styled.img`
  position: absolute;
  bottom: 0;
  width: 100vw;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 40rem;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s;
  margin-top: 2rem;

  ${({ theme }) => css`
    border: 2px solid ${theme.colors.white};
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};
  `}

  & > img {
    width: 2.8rem;
    height: 2.8rem;
  }

  &:hover {
    filter: brightness(0.8);
  }

  ${media.lessThan("medium")`
      width: 25rem;

  `}
`;
