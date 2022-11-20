import { FC, HTMLProps, ReactNode } from 'react';

import * as S from './Button.styles';

export interface Props extends HTMLProps<HTMLButtonElement> {
  as?: any;
  disabled?: boolean;
  solid?: boolean;
  smallPadding?: boolean;
  children: ReactNode;
}

const Button: FC<Props> = ({
  disabled,
  solid,
  smallPadding,
  children,
  ...props
}) => {
  return (
    <S.Wrapper
      $disabled={!!disabled}
      $solid={!!solid}
      $smallPadding={smallPadding}
      {...props}
    >
      {children}
    </S.Wrapper>
  );
};

export default Button;
