import React from "react";
import { AccountLoginForm, AccountSignUpForm, User } from "@src/model";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api, nextApi } from "@src/services";
import Router from "next/router";
import jwtDecode from "jwt-decode";

interface UseAuthenticate {
  user: User;
  logged: boolean;
  loading: boolean;
  login: (params: AccountLoginForm) => void;
  signUp: (params: AccountSignUpForm) => void;
  logout: () => void;
}

const AuthContext = React.createContext({} as UseAuthenticate);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>();
  const logged = !!user;
  const [loading, setLoading] = React.useState(true);

  const auth = getAuth();

  React.useEffect(() => {
    async function getUserFromToken() {
      const { nextauthToken: token } = parseCookies();

      if (token) {
        const { email }: { email: string } = jwtDecode(token);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await nextApi.post("/user/get/email", {
          email,
        });
        const appUser = response.data;

        setUser(appUser);
      }
      setLoading(false);
    }

    if (!user) {
      getUserFromToken();
    }
  }, [user]);

  const logout = () => {
    destroyCookie(undefined, "nextauthToken");
    api.defaults.headers.common["Authorization"] = "";
    Router.reload();
  };

  const login = async ({ email, password }: AccountLoginForm) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const response = await nextApi.post("/user/get/email", { email });
      const appUser = response.data;

      setUser(appUser);

      const firebaseUser: any = userCredential.user.toJSON();
      const token = firebaseUser.stsTokenManager.accessToken;

      setCookie(undefined, "nextauthToken", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({
    name,
    lastName,
    username,
    email,
    password,
  }: AccountSignUpForm) => {
    try {
      setLoading(true);
      const completeName = name + " " + lastName;
      await nextApi.post("/user/create", {
        input: { name: completeName, email, password, nickname: username },
      });

      await login({ email, password });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, signUp, logout, loading, logged, user: user as User }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticate = () => React.useContext(AuthContext);
