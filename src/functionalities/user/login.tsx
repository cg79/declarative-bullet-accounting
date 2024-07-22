import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LabelInput } from '../../_components/reuse/LabelInput';
import { MyButton } from '../../_components/reuse/my-button';
import { MyLottie } from '../../_components/reuse/my-lottie';
import useIdentity from '../../_store/useIdentity';
import { useBetween } from '../../hooks/useBetween';
import GoogleAuth from './google-auth';
import { gapi } from 'gapi-script';

import { useUserMethods } from './useUserMethods';
import useEvents from '../../_store/useEvents';
import { MyCheckbox } from '../../_components/reuse/my-checkbox';
import LocalStorageStorageManager from './localstorage-management';
import { LoginRequest } from './types';
import { LabelButton } from '../../_components/reuse/LabelButton';
import { GOOGLECLIENTID } from './constants';
// import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";

export const Login = () => {
  const navigate = useNavigate();
  const { loggedUser, setareUserLogat } = useBetween(useIdentity);
  const { callLoginMethod } = useUserMethods();
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);

  const [error, setError] = useState('');
  // const storedEmail = LocalStorageStorageManager.getItem("email");

  const [data, setData] = React.useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [checked, setChecked] = useState(false);
  const updateChecked = (value: boolean) => {
    setChecked(value);
    if (value && !data.email) {
      const storedEmail = LocalStorageStorageManager.getItem<string>('email');
      if (storedEmail) {
        setData((data: LoginRequest) => ({ ...data, email: storedEmail }));
      }
    }
  };
  const updateData = (value: any, key: string) => {
    setData(() => ({ ...data, [key]: value }));
  };

  const onLogin = useCallback(
    (user: any) => {
      debugger;
      setareUserLogat(user);
      if (checked) {
        LocalStorageStorageManager.setItem('email', user.email);
      } else {
        LocalStorageStorageManager.removeItem('email');
      }
    },
    [checked, setareUserLogat]
  );

  useEffect(() => {
    if (!loggedUser) {
      return;
    }

    return navigate('/categories');
  }, [loggedUser, navigate]);

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    callLoginMethod(data)
      .then((res) => onLogin(res))
      .catch((err) => {
        setError(err.message);
      });
    clearEnterPressed();
  }, [enterPressed, data, callLoginMethod, clearEnterPressed, onLogin]);

  useEffect(() => {
    const initializeGapi = () => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: GOOGLECLIENTID,
        });
      });
    };

    initializeGapi();
  }, []);

  return (
    <div className="flex flex-column center-v">
      <div style={{ marginBottom: '20px' }}>
        {/* <MyLottie></MyLottie> */}
        <img src="/images/sign-in.png" />
      </div>

      <div className="mt10 fcenter">
        <LabelButton label="">
          <MyButton
            text="Logare cu Google"
            onClick={() => {
              const auth2 = gapi.auth2.getAuthInstance();
              auth2
                .signIn()
                .then((googleUser) => {
                  debugger;
                  const profile = googleUser.getBasicProfile();
                  const email = profile.getEmail();
                  const password = profile.getId();
                  const nick = profile.getGivenName();
                  callLoginMethod({ email, password, provider: 'google', nick })
                    .then((res) => onLogin(res))
                    .catch((err) => {
                      setError(err.message);
                    });
                  // console.log("ID: " + profile.getId());
                  // console.log("Name: " + profile.getName());
                  // console.log("Image URL: " + profile.getImageUrl());
                  // console.log("Email: " + profile.getEmail());
                  // Handle login success, e.g., send the profile info to your server or update your app's state
                })
                .catch((error) => {
                  console.error('Login failed:', error);
                });
            }}
            className="linkbutton"
          >
            <img src="/images/btn_google_signin_dark_normal_web.png" />
          </MyButton>
        </LabelButton>
      </div>

      <div className="">
        <LabelInput
          label="Email: "
          onChange={(val: string) => updateData(val, 'email')}
          value={data.email}
        ></LabelInput>

        <div className="mt10">
          <LabelInput
            label="Parola:"
            // type="password"
            onChange={(val: string) => updateData(val, 'password')}
            value={data.password}
            type="password"
          ></LabelInput>
        </div>

        <div className="fcenter " style={{ marginTop: '20px' }}>
          <MyCheckbox
            id="remember"
            label="Pastreaza utilizatorul"
            checked={checked}
            value={checked}
            onChange={() => updateChecked(!checked)}
          ></MyCheckbox>
        </div>
        <div className="fcenter " style={{ marginTop: '20px' }}>
          <MyButton
            onClick={() =>
              callLoginMethod(data)
                .then((res) => onLogin(res))
                .catch((err) => {
                  setError(err.message);
                })
            }
            text="Logare"
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          {error && <div className="mt10 error">{error}</div>}
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate('/parola')}
            text="Am uitat Parola"
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate('/crearecont')}
            text="Navigare catre ecranul de creare utilizator"
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
