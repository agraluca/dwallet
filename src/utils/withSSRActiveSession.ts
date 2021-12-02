import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

export function withSSRActiveSession<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = ctx.req.headers.cookie;
    const hasValue =
      session
        ?.split(";")
        .find((item) => item === "authToken=")
        ?.split("=")[1] !== "";

    if (hasValue) {
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
