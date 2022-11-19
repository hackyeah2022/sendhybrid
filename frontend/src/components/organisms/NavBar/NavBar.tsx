import { FC } from 'react';
import Link from 'next/link';

import routes from 'utils/routes';
import Button from 'components/atoms/Button/Button';

import * as S from './NavBar.styles';

export interface Props {}

const NavBar: FC<Props> = ({ ...props }) => {
  return (
    <S.Wrapper {...props}>
      <Link href={routes.LOGIN} passHref legacyBehavior>
        <Button as="a">Login</Button>
      </Link>
    </S.Wrapper>
  );
};

export default NavBar;
