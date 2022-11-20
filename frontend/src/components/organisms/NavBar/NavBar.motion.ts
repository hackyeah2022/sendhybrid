import { Variants } from 'framer-motion';

export const variants: Variants = {
  hidden: {
    y: '-100%',
  },
  visible: {
    y: '0%',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.4,
    },
  },
};
