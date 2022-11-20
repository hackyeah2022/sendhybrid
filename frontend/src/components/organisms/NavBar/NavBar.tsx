import { FC } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import styled from 'styled-components';

import { useGlobalState, UserRole } from 'utils/store';
import routes from 'utils/routes';
import Button from 'components/atoms/Button/Button';

import * as S from './NavBar.styles';
import { variants } from './NavBar.motion';
import UserCircle from '../../../icons/UserCircle';

const Logo = styled.img`
  height: 3rem;
  margin-right: 2rem;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const Dropdown = styled(Menu.Items)`
  position: absolute;
  top: 100%;
  display: block;
  border: 2px solid #eee;
  border-radius: 0.25rem;
  min-width: 100%;
`;

const DropdownButton = styled(Menu.Button)`
  transition: 0.2s all;
  border-radius: 0.25rem;
  padding: 0.2rem 0.4rem;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 2rem;
    margin-right: 0.5rem;
  }

  &:hover {
    background: #eee;
  }
`;

const DropdownMenuItem = styled.a`
  display: block;
  border: none;
  padding: 0.7rem;
  background: white;
  text-align: left;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const LeftSideWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const NavLink = styled.a`
  padding: 0 0.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  transition: 0.2s all;
  &:hover {
    background: #eee;
  }
`;

const SpecialNavBarItem = styled.a`
  color: ${({ theme }) => theme.colors.primary[2]};
  font-weight: 600;
  margin: 0 1rem;
`;

const UserDropdown = ({
  name,
  setUserRole,
  router,
}: {
  name: string;
  setUserRole: (role: UserRole) => void;
  router: NextRouter;
}) => (
  <DropdownWrapper>
    <Menu>
      <DropdownButton>
        <UserCircle />
        {name}
      </DropdownButton>

      <Dropdown>
        <Menu.Item>
          <Link href="/user-profile">
            <DropdownMenuItem>
              Profil{' '}
              {name === 'Administrator' ? 'administratora' : 'użytkownika'}
            </DropdownMenuItem>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/settings">
            <DropdownMenuItem>Ustawienia</DropdownMenuItem>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <DropdownMenuItem
            onClick={() => {
              setUserRole('guest');
              router.push(routes.LANDING);
            }}
            as="button"
            style={{ width: '100%' }}
          >
            Wyloguj
          </DropdownMenuItem>
        </Menu.Item>
      </Dropdown>
    </Menu>
  </DropdownWrapper>
);

export interface Props {}

const NavBar: FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const [userRole, setUserRole] = useGlobalState('userRole');
  const isLoggedIn = userRole !== 'guest';
  return (
    <S.Wrapper
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      <LeftSideWrapper>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Logo src="/KAS_logo.jpg" />
          </a>
        </Link>
        {isLoggedIn && userRole === 'privileged' && (
          <Link href="/send" passHref legacyBehavior>
            <SpecialNavBarItem>Wyślij nowy dokument</SpecialNavBarItem>
          </Link>
        )}
        {isLoggedIn && userRole === 'privileged' && (
          <>
            <Link href="/submissions" passHref legacyBehavior>
              <NavLink>Dokumenty</NavLink>
            </Link>
          </>
        )}
        {isLoggedIn && userRole === 'admin' && (
          <Link href="/admin/dashboard" passHref legacyBehavior>
            <NavLink>Panel administratora</NavLink>
          </Link>
        )}
      </LeftSideWrapper>
      {router.pathname !== routes.LOGIN && !isLoggedIn && (
        <Link href={routes.LOGIN} passHref legacyBehavior>
          <Button as="a" smallPadding>
            Zaloguj się
          </Button>
        </Link>
      )}
      {isLoggedIn && (
        <UserDropdown
          name={userRole === 'privileged' ? 'Jan Kowalski' : 'Administrator'}
          setUserRole={setUserRole}
          router={router}
        />
      )}
    </S.Wrapper>
  );
};

export default NavBar;
