import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false); //как только срабатывает useEffect, переведёт этот флаг в true
  //(чтобы не редиректило)

  //Поменяй стейт токена и юзер-id, и запиши в localStorage
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    ); //привести объект в строку
  }, []);

  //Занули стейт токена и юзер-id, и удали storageName в localStorage
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)); //привести строку в объект
    //Если дата есть и в ней есть токен, вызови login с этими параметрами из localStorage
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
