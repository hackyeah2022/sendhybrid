import styled from 'styled-components';

export const Wrapper = styled.div<{ $wide: boolean }>`
  width: ${({ $wide }) => ($wide ? '100%' : '768px')};
  height: 100%;
  display: flex;
  flex-direction: column;
`;
