import Main from "templates/Main";
import { withSSRActiveSession } from "utils";

export default function SignIn() {
  return (
    <Main
      title="DWallet"
      description="Crie e ajuste sua carteira de investimento de forma ágil e prática. "
    />
  );
}

export const getServerSideProps = withSSRActiveSession(async () => {
  return {
    props: {},
  };
});
