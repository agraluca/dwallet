import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { api } from "services/axios";

const options = {
  pages: {
    signIn: "/",
  },
  providers: [
    Providers.Credentials({
      name: "Sign-in",
      credentials: {},
      async authorize({ email, password }) {
        const credential = { email, password };
        const data = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
          JSON.parse(credential)
        );

        console.log("dados", data);

        if (data) {
          return {
            ...data,
            jwt: data.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.jwt = user.jwt;
      }

      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
