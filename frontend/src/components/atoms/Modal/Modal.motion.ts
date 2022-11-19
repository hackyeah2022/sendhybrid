import { Variants } from 'framer-motion';

export const ScreenOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

export const ModalWindowVariants: Variants = {
  hidden: {
    y: 200,
    scale: 0.5,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};
