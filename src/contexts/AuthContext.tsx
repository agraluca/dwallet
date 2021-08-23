import { createContext, ReactNode, useCallback, FormEvent } from "react";
import { signIn, signOut, Provider } from "next-auth/client";
import { Session } from "next-auth";

export type ProviderProps = {
  logIn: (event: FormEvent) => void;
  logOut: (event: FormEvent) => void;
};

export const providerDefaultValues = {
  logIn: () => false,
  logOut: () => false,
};

export const AuthContext = createContext<ProviderProps>(providerDefaultValues);

export type LogInProviderProps = {
  children: ReactNode;
  session: Session;
};

export function AuthProvider({ children, session }: LogInProviderProps) {
  const logIn = useCallback(() => {
    signIn("google", {
      callbackUrl: `${process.env.PUBLIC_URL}/home`,
    });
  }, []);

  const logOut = useCallback(() => {
    signOut({ callbackUrl: `${process.env.PUBLIC_URL}` });
  }, []);

  return (
    <Provider session={session}>
      <AuthContext.Provider value={{ logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    </Provider>
  );
}
