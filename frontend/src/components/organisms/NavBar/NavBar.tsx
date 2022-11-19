import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import routes from 'utils/routes';
import Button from 'components/atoms/Button/Button';

import * as S from './NavBar.styles';

export interface Props {}

const NavBar: FC<Props> = ({ ...props }) => {
  const router = useRouter();
  return (
    <S.Wrapper {...props}>
      {router.pathname !== routes.LOGIN && (
        <Link href={routes.LOGIN} passHref legacyBehavior>
          <Button as="a">Login</Button>
        </Link>
      )}
    </S.Wrapper>
  );
};

export default NavBar;
