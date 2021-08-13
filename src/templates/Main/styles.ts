import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    color: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `}
`;

export const Logo = styled.img`
  width: 10rem;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
`;

export const Description = styled.p`
  font-size: 2rem;
  font-weight: 400;
`;

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`;
