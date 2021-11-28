import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getToken } from "services/localStorageService";

export function withSSRActiveSession<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = getToken();

    if (session) {
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
