import Link from "next/link";
import Image from "next/image";

import UserDropdown from "components/UserDropdown";

import * as S from "./styles";
import jwt_decode from "jwt-decode";
import MediaMatch from "components/MediaMatch";

import { Menu as MenuIcon } from "@styled-icons/open-iconic/Menu";
import { Close as CloseIcon } from "@styled-icons/material-outlined/Close";
import { useState } from "react";
import { getToken } from "services/localStorageService";

type TokenProps = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};
function Menu() {
  const token = getToken() ?? "";

  const decodedToken: TokenProps = jwt_decode(token);

  const username = token && decodedToken.name;

  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    console.log("logout");
  };

  return (
    <>
      <S.MenuWrapper>
        <MediaMatch greaterThan="medium">
          <S.NavWrapper>
            <Link href="/home" passHref>
              <S.MenuLink>Sua carteira</S.MenuLink>
            </Link>
            <Link href="/search" passHref>
              <S.MenuLink>Pesquisar</S.MenuLink>
            </Link>
          </S.NavWrapper>
        </MediaMatch>

        <S.LogoWrapper>
          <Link href="/home" passHref>
            <a>
              <Image
                width={75}
                height={66}
                src="/img/logo.svg"
                alt="Logo amarela com formato de um W"
              />
            </a>
          </Link>
        </S.LogoWrapper>
        <MediaMatch greaterThan="medium">
          <UserDropdown username={username} />
        </MediaMatch>

        <MediaMatch lessThan="medium">
          <S.IconWrapper onClick={() => setIsOpen(true)}>
            <MenuIcon aria-label="Open Menu" />
          </S.IconWrapper>
        </MediaMatch>
      </S.MenuWrapper>

      <MediaMatch lessThan="medium">
        <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
          <CloseIcon
            className="fullMenu__close-icon"
            aria-label="Close Menu"
            onClick={() => setIsOpen(false)}
          />
          <S.NavWrapper>
            <Link href="/home" passHref>
              <S.MenuLink>Sua carteira</S.MenuLink>
            </Link>
            <Link href="/search" passHref>
              <S.MenuLink>Pesquisar</S.MenuLink>
            </Link>

            <Link href="#">
              <S.MenuLink role="button" onClick={logOut}>
                Sair
              </S.MenuLink>
            </Link>
          </S.NavWrapper>
        </S.MenuFull>
      </MediaMatch>
    </>
  );
}

export default Menu;
