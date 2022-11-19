import { FC } from 'react';

import Button from 'components/atoms/Button/Button';

import * as S from './NavBar.styles';

export interface Props {}

const NavBar: FC<Props> = ({ ...props }) => {
  return (
    <S.Wrapper {...props}>
      <Button>Login</Button>
    </S.Wrapper>
  );
};

export default NavBar;
