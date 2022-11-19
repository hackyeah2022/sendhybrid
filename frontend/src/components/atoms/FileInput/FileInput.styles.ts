import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  width: 24rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: 2px dashed ${({ theme }) => theme.colors.neutral[1]};
  border-radius: 1rem;
`;

export const Input = styled.input``;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.primary[2]};
  font-weight: 600;
`;

export const ProgressBar = styled(motion.div)<{ $value: number }>`
  position: relative;
  width: 18rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.primary[0]};
  border-radius: 0.25rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 0 0;
    transform-origin: left center;
    transform: scaleX(${({ $value }) => $value});
    background-color: ${({ theme }) => theme.colors.lightBlue};
    border-radius: 0.25rem;
  }
`;

export const SelectedFileName = styled.p`
  color: ${({ theme }) => theme.colors.neutral[5]};
`;

export const SelectedFileWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.neutral[1]};
`;
