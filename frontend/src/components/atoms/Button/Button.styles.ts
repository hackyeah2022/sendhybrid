import styled from 'styled-components';

export const Wrapper = styled.button<{ $disabled: boolean; $solid: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.lightBlue};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;

  ${({ $solid, theme }) =>
    $solid &&
    `
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.white};
    `}

  ${({ $disabled, theme }) =>
    $disabled &&
    `
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.gray};
  border: 2px solid ${theme.colors.mediumLightGray};
  `}
`;
