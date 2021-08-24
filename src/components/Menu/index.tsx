import Link from "next/link";
import Image from "next/image";

import UserDropdown from "components/UserDropdown";

import * as S from "./styles";
import { useSession } from "next-auth/client";

function Menu() {
  const [session] = useSession();
  const username = session?.user?.name?.split(" ")[0];

  return (
    <S.MenuWrapper>
      <S.NavWrapper>
        <Link href="/home" passHref>
          <S.MenuLink>Sua carteira</S.MenuLink>
        </Link>
        <Link href="/search" passHref>
          <S.MenuLink>Pesquisar</S.MenuLink>
        </Link>
      </S.NavWrapper>

      <S.LogoWrapper>
        <Link href="/home" passHref>
          <Image
            width={75}
            height={66}
            src="/img/logo.svg"
            alt="Logo amarela com formato de um W"
          />
        </Link>
      </S.LogoWrapper>

      <UserDropdown username={username} />
    </S.MenuWrapper>
  );
}

export default Menu;
