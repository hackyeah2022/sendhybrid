import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 24rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: 2px dashed ${({ theme }) => theme.colors.mediumLightGray};
  border-radius: 0.5rem;
`;

export const Input = styled.input``;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.lightBlue};
`;

export const ProgressBar = styled.div<{ $value: number }>`
  position: relative;
  width: 18rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.mediumLightGray};

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 0 0;
    transform-origin: left center;
    transform: scaleX(${({ $value }) => $value});
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;
