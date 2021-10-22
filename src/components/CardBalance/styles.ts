import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.small};
    gap: calc(${theme.grid.gutter} / 2) 0;
    width: 33.4rem;
    background: linear-gradient(
      180deg,
      ${theme.colors.black} 0%,
      rgba(51, 51, 51, 0.85) 100%
    );
    border: 0.3rem solid ${theme.colors.yellow};
    border-radius: ${theme.border.radius};
    min-height: 14.2rem;
  `}
`;

export const TitleWrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0 calc(${theme.grid.gutter} / 2);
  `}
`;

export const Title = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weight.normal};

    &.card__value_size {
      font-size: ${theme.font.sizes.xlarge};
      font-weight: ${theme.font.weight.bold};
    }
  `}
`;

export const ToggleButton = styled.button`
  background: transparent;
  height: auto;
  width: auto;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: 4rem;
  height: 4rem;

  transition: border 0.2s ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.green};
    border-radius: 50%;
    & img {
      filter: brightness(0.8);
    }
  }
`;
