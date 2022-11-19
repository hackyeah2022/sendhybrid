import styled from 'styled-components';

export const Wrapper = styled.nav`
  position: fixed;
  inset: 0 0 auto 0;
  height: ${({ theme }) => theme.layout.navBarHeight};
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  z-index: ${({ theme }) => theme.zIndexes.navBar};
`;
