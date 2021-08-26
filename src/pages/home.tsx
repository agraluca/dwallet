import Wallet from "templates/Wallet";
import { withSSRAuth } from "utils";

export default function Home() {
  return <Wallet />;
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
