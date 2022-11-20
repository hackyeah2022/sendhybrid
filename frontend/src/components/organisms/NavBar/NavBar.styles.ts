import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.nav)`
  position: fixed;
  inset: 0 0 auto 0;
  height: ${({ theme }) => theme.layout.navBarHeight};
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  z-index: ${({ theme }) => theme.zIndexes.navBar};
  background: ${({ theme }) => theme.colors.white};

  @media print {
    display: none;
  }
`;
