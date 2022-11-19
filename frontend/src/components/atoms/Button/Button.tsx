import { FC, HTMLProps, ReactNode } from 'react';

import * as S from './Button.styles';

export interface Props extends HTMLProps<HTMLButtonElement> {
  as?: any;
  disabled?: boolean;
  solid?: boolean;
  children: ReactNode;
}

const Button: FC<Props> = ({ disabled, solid, children, ...props }) => {
  return (
    <S.Wrapper $disabled={!!disabled} $solid={!!solid} {...props}>
      {children}
    </S.Wrapper>
  );
};

export default Button;
