import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const Content = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${({ theme }) => theme.layout.navBarHeight};
`;
