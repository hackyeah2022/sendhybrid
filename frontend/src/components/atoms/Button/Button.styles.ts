import styled from 'styled-components';

export const Wrapper = styled.button<{
  $disabled: boolean;
  $solid: boolean;
  $smallPadding: boolean;
}>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary[1]};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.primary[2]};
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }

  ${({ $smallPadding }) => $smallPadding && `padding: 0.6rem 1.1rem;`}

  ${({ $solid, theme }) =>
    $solid &&
    `
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.neutral[0]};
    border: none;
    `}

  ${({ $disabled, theme }) =>
    $disabled &&
    `
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.gray};
  border: 2px solid ${theme.colors.mediumLightGray};
  `}
`;
