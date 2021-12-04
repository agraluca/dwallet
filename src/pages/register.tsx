import RegisterPage from "templates/Register";
import { withSSRActiveSession } from "utils";

export default function Register() {
  return <RegisterPage />;
}

export const getServerSideProps = withSSRActiveSession(async () => {
  return {
    props: {},
  };
});
