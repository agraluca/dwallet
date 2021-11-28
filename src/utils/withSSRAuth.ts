import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getToken } from "services/localStorageService";

//! Recebe uma função que pode ser executada caso a autenticação esteja OK
//! o <P> foi pelo Generic Type, era necessário ter pelo menos um argumento no GetServerSidePropsResult
//! Se sessão não tiver on, redirect. Se não, executa função.
export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = getToken();
    console.log(session);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
