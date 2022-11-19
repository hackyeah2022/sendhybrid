import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const Content = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${({ theme }) => theme.layout.navBarHeight};
`;
