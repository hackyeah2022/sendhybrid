import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGlobalState } from 'utils/store';
import routes from 'utils/routes';
import Button from 'components/atoms/Button/Button';

import * as S from './NavBar.styles';
import styled from 'styled-components';
import { Menu } from '@headlessui/react';
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

const UserDropdown = ({ name }: any) => (
  <DropdownWrapper>
    <Menu>
      <DropdownButton>
        <UserCircle />
        {name}
      </DropdownButton>

      <Dropdown>
        <Menu.Item>
          <Link href="/user-profile">
            <DropdownMenuItem>Profil użytkownika</DropdownMenuItem>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/settings">
            <DropdownMenuItem>Ustawienia</DropdownMenuItem>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/sign-out">
            <DropdownMenuItem>Wyloguj</DropdownMenuItem>
          </Link>
        </Menu.Item>
      </Dropdown>
    </Menu>
  </DropdownWrapper>
);

export interface Props {}

const NavBar: FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const [userRole] = useGlobalState('userRole');
  const isLoggedIn = userRole !== 'guest';
  return (
    <S.Wrapper {...props}>
      <LeftSideWrapper>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Logo src="/KAS_logo.jpg" />
          </a>
        </Link>
        {isLoggedIn && (
          <Link href="/send" passHref legacyBehavior>
            <SpecialNavBarItem>Wyślij nowy list</SpecialNavBarItem>
          </Link>
        )}
        {isLoggedIn && (
          <>
            <Link href="/submissions" passHref legacyBehavior>
              <NavLink>Zgłoszenia</NavLink>
            </Link>
          </>
        )}
      </LeftSideWrapper>
      {router.pathname !== routes.LOGIN && !isLoggedIn && (
        <Link href={routes.LOGIN} passHref legacyBehavior>
          <Button as="a">Login</Button>
        </Link>
      )}
      {isLoggedIn && <UserDropdown name="Jan Kowalski" />}
    </S.Wrapper>
  );
};

export default NavBar;
