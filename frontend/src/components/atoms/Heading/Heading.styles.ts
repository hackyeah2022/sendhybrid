import styled from 'styled-components';

export const Wrapper = styled.h1`
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.neutral[5]};
`;
