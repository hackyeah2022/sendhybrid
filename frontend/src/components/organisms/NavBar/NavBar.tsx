import {FC} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import routes from 'utils/routes';
import Button from 'components/atoms/Button/Button';

import * as S from './NavBar.styles';
import styled from "styled-components";
import {Menu} from '@headlessui/react'
import UserCircle from "../../../icons/UserCircle";

const Logo = styled.img`
  height: calc(100% - 1rem);
`

const DropdownWrapper = styled.div`
  position: relative;
`

const Dropdown = styled(Menu.Items)`
  position: absolute;
  top: 100%;
  display: block;
  border: 2px solid #eee;
  border-radius: 0.25rem;
  min-width: 100%;
`

const DropdownButton = styled(Menu.Button)`
  transition: .2s all;
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
`

const DropdownMenuItem = styled.a`
  display: block;
  border: none;
  padding: 0.7rem;
  background: white;
  text-align: left;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: .2s all;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`

const UserDropdown = ({name}) => (
    <DropdownWrapper>
        <Menu>
            <DropdownButton>
                <UserCircle/>
                {name}
            </DropdownButton>

            <Dropdown>
                <Menu.Item>

                    <Link href="/user-profile">
                        <DropdownMenuItem>
                            Profil użytkownika
                        </DropdownMenuItem>
                    </Link>

                </Menu.Item>
                <Menu.Item>
                    <Link href="/settings">
                        <DropdownMenuItem>
                            Ustawienia
                        </DropdownMenuItem>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/sign-out">
                        <DropdownMenuItem>
                            Wyloguj
                        </DropdownMenuItem>
                    </Link>
                </Menu.Item>
            </Dropdown>
        </Menu>
    </DropdownWrapper>
)

export interface Props {
}

const NavBar: FC<Props> = ({...props}) => {
    const router = useRouter();
    const isLoggedIn = true;
    return (
        <S.Wrapper {...props}>
            <Logo src="/KAS_logo.jpg"/>
            {router.pathname !== routes.LOGIN && !isLoggedIn && (
                <Link href={routes.LOGIN} passHref legacyBehavior>
                    <Button as="a">Login</Button>
                </Link>
            )}
            {
                isLoggedIn && (
                    <UserDropdown name="Jan Kowalski" />
                )
            }

        </S.Wrapper>
    );
};

export default NavBar;
