import { createContext } from "react";

function noop() {} //Передаётся в качестве дефолтного значения пустая функция (no operation)

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
});
