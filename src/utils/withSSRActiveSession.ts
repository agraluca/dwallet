import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getCookies } from "services/cookiesService";

export function withSSRActiveSession<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = getCookies("authToken");

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
