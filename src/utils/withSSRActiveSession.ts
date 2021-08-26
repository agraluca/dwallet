import { getSession } from "next-auth/client";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

export function withSSRActiveSession<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(ctx);

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
