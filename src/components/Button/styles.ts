import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.blue};
    border: 2px solid ${theme.colors.blue};
    width: 17rem;
    padding: 1.3rem;
    border-radius: 0.8rem;
    font-size: 1.7rem;
    font-weight: bold;
    cursor: pointer;
  `}
`;

export const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
`;
