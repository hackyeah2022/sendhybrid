import { FC, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useClickOutside } from '@mantine/hooks';

import {
  ModalWindowVariants,
  ScreenOverlayVariants,
} from 'components/atoms/Modal/Modal.motion';

import * as S from './Modal.styles';

export interface Props {
  opened: boolean;
  setIsOpened: (value: boolean) => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ opened, setIsOpened, children, ...props }) => {
  const ref = useClickOutside(() => setIsOpened(false));
  return (
    <AnimatePresence>
      {opened && (
        <S.ScreenOverlay
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={ScreenOverlayVariants}
        >
          <S.Wrapper
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={ModalWindowVariants}
            ref={ref}
            {...props}
          >
            {children}
          </S.Wrapper>
        </S.ScreenOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
