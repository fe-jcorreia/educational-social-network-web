import React from "react";
import { LoginAccountFormData, SignUpAccountFormData, User } from "@src/model";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { nextApi } from "@src/services";

interface UseAuthenticate {
  login: (params: LoginAccountFormData) => void;
  signUp: (params: SignUpAccountFormData) => void;
}

export const useAuthenticate = (): UseAuthenticate => {
  const [logged, setLogged] = React.useState<boolean>();
  const [user, setUser] = React.useState<User>();

  const auth = getAuth();

  const login = async ({ email, password }: LoginAccountFormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user: any = userCredential.user.toJSON();

      const token = user.stsTokenManager.accessToken;

      console.log(user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const signUp = async ({
    name,
    lastName,
    username,
    email,
    password,
  }: SignUpAccountFormData) => {
    try {
      const completeName = name + " " + lastName;
      await nextApi.post("/user/create", {
        input: { name: completeName, email, nickname: username },
      });

      console.log(JSON.stringify(user));
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return { login, signUp };
};
