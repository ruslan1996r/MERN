import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // throw - генерирует исключение. Если срабатывает, то сразу передаёт управление блоку CATCH
  // data.message - сообщение об ошибке с бека
  // useCallback - чтобы не было рекурсии (Возвращает мемоизированный колбэк)

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        //Преобразовать в строку, иначе будет ошибка [object Object]
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        //Сформировать fetch-запрос
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так!");
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []); //useCallback чтобы не возникала рекурсия

  return { loading, request, error, clearError };
};
