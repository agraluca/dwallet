import Dropdown from "components/Dropdown";

import { ExitToApp } from "@styled-icons/material/ExitToApp";
import { AccountCircle } from "@styled-icons/material-outlined/AccountCircle";

import { useAuth } from "hooks";

import * as S from "./styles";

export type UserDropdownProps = {
  username?: string;
};

function UserDropdown({ username = "" }: UserDropdownProps) {
  const { logOut } = useAuth();

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
