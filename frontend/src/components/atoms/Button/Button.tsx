import { FC, ReactNode } from 'react';

import * as S from './Button.styles';

export interface Props {
  as?: any;
  solid?: boolean;
  children: ReactNode;
}

const Button: FC<Props> = ({ children, ...props }) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default Button;
