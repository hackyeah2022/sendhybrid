import styled from 'styled-components';

export const Wrapper = styled.button`
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.colors.blue};
  border: 2px solid ${({ theme }) => theme.colors.lightBlue};
  border-radius: 0.25rem;
`;
