import styled from 'styled-components';

export const Wrapper = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.lightBlue};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;
`;
