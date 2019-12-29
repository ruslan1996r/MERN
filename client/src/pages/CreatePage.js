import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async event => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link
          },
          { authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
        window.data = data;
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields(); //убирает визуальный баг с Materialize инпутами (теперь всегда активные labels)
  }, []);
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку  и нажмите Enter"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};
