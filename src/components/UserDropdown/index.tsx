import Dropdown from "components/Dropdown";

import { ExitToApp } from "@styled-icons/material/ExitToApp";
import { AccountCircle } from "@styled-icons/material-outlined/AccountCircle";

import * as S from "./styles";
import { removeItemFromStorage } from "services/localStorageService";
import { removeCookies } from "services/cookiesService";
import { useRouter } from "next/dist/client/router";

export type UserDropdownProps = {
  username?: string;
};

function UserDropdown({ username = "" }: UserDropdownProps) {
  const routes = useRouter();
  const { push } = routes;

  const logOut = () => {
    removeItemFromStorage("token");
    removeItemFromStorage("refresh_token");
    removeCookies();

    push("/");
  };
  return (
    <Dropdown
      title={
        <>
          <S.Username>{username}</S.Username>
          <AccountCircle size={64} className="user-dropdown--accountCircle" />
        </>
      }
    >
      <S.Nav>
        <S.Link role="button" onClick={logOut}>
          <ExitToApp title="Sair da conta" />
          <span>Sair</span>
        </S.Link>
      </S.Nav>
    </Dropdown>
  );
}

export default UserDropdown;
