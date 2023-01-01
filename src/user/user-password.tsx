import { useEffect, useState } from "react";
import { loginBulletIO_01 } from "../_factory/prerequisites";
import { store } from "../_store/store";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UserPassword = () => {
  const navigate = useNavigate();
  
  const [isLogged, setIsLogged] = useState(false);
  const setBulletKey = (value: any) =>
    store.set("BULLET_KEY", value);
  const setUserName = (value: any) => store.set("USERNAME", value);
  const setUserPassword = (value: any) =>
    store.set("PASSWORD", value);
  
    const [data, setData] = React.useState<any>({
      key: '6d8ab6415d4b1d760f2b447f3a3842d0',
      email: 'claudiu9379@yahoo.com',
      password: 'a1',
    });

    const updateData = (event: any, key: string) => {
      setData(() => ({ ...data, [key]: event.target.value }));
    }

  const callLoginMethod = () => {
    debugger;
    setBulletKey(data.key);
    setUserName(data.email);
    setUserPassword(data.password);

    loginBulletIO_01().then((v) => {
      // debugger;
      setIsLogged(true);
      navigate("/accounting");
    });
  };

  useEffect(() => {
    const logged = store.get("BULLET_IO_USER");
    if (logged) {
      setIsLogged(true);
    }
  }, []);

  return !isLogged ? (
    <div className="flex flex-column center-v">
      enter the bullet key (from dashboard) email address and password
      <label htmlFor="inp" className="inp">
        <input
          type="text"
          id="bulletkey"
          placeholder="&nbsp;"
          onChange={(event)=>updateData(event, 'key')}
          value={data.key}
        />
        <span className="label">Bullet key...</span>
        <span className="focus-bg"></span>
      </label>
      <label htmlFor="inp" className="inp">
        <input
          type="text"
          id="username"
          placeholder="&nbsp;"
          // onChange={setUserName}
          onChange={(event)=>updateData(event, 'email')}
          value={data.email}
        />
        <span className="label">Email...</span>
        <span className="focus-bg"></span>
      </label>
      <label htmlFor="inp" className="inp">
        <input
          type="password"
          id="password"
          placeholder="&nbsp;"
          value={data.password}
          onChange={(event)=>updateData(event, 'password')}
          // onChange={setUserPassword}
        />
        <span className="label">Password...</span>
        <span className="focus-bg"></span>
      </label>
      <button
        className="ml5 mt5"
        type="button"
        onClick={() => callLoginMethod()}
      >
        Login
      </button>
    </div>
  ) : null;
};
