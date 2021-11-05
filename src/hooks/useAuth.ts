import { useCallback } from "react";
import { signIn, signOut } from "next-auth/client";

export const useAuth = () => {
  const logIn = useCallback(() => {
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home`,
    });
  }, []);

  const logOut = useCallback(() => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/` });
  }, []);

  return { logIn, logOut };
};
