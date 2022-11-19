import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ScreenOverlay = styled(motion.div)`
  position: fixed;
  inset: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[5]}7F;
  z-index: ${({ theme }) => theme.zIndexes.overlay};
`;

export const Wrapper = styled(motion.div)`
  width: 32rem;
  height: 24rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: 1rem;
  box-shadow: 0 20px 40px hsla(0, 0%, 0%, 0.2);
`;
