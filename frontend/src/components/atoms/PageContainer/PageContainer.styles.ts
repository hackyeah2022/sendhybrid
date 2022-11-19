import styled from 'styled-components';

export const Wrapper = styled.div<{ $wide: boolean; $centerContent: boolean }>`
  width: ${({ $wide }) => ($wide ? '100%' : '768px')};
  height: 100%;
  display: flex;
  flex-direction: column;

  ${({ $centerContent }) =>
    $centerContent
      ? `
      justify-content: center;
      align-items: center;
  `
      : ``}
`;
