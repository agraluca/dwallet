/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useCallback, FormEvent } from "react";
import { signIn, signOut, Provider } from "next-auth/client";

interface ProviderProps {
  logIn: (event: FormEvent) => void;
  logOut: (event: FormEvent) => void;
}

export const AuthContext = createContext({} as ProviderProps);

interface LogInPRoviderProps {
  children: ReactNode;
  session: any;
}

export function AuthProvider({ children, session }: LogInPRoviderProps) {
  const logIn = useCallback(() => {
    signIn("google", {
      callbackUrl: "http://localhost:3000/home",
    });
  }, []);

  const logOut = useCallback(() => {
    signOut({ callbackUrl: "http://localhost:3000/" });
  }, []);

  return (
    <Provider session={session}>
      <AuthContext.Provider value={{ logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    </Provider>
  );
}
