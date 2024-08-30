import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LabelInput } from '../../_components/reuse/LabelInput';
import { MyButton } from '../../_components/reuse/my-button';
// import { MyLottie } from '../../_components/reuse/my-lottie';
import useIdentity from '../../_store/useIdentity';
import { useBetween } from '../../hooks/useBetween';
// import GoogleAuth from './google-auth';
// import { gapi } from 'gapi-script';

import { useUserMethods } from './useUserMethods';
import useEvents from '../../_store/useEvents';
import { MyCheckbox } from '../../_components/reuse/my-checkbox';
import LocalStorageStorageManager from './localstorage-management';
import { LoginRequest } from './types';
// import { LabelButton } from '../../_components/reuse/LabelButton';
// import { GOOGLECLIENTID } from './constants';
import useScreenSize from '../../hooks/useScreenSize';
import GoogleLoginButton, { GoogleCredentials } from './GoogleLoginButton';
import useTranslations from '../translations/useTranslations';
// import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";

export const Login = () => {
  const navigate = useNavigate();
  const { currentTranslation } = useBetween(useTranslations);
  const { loggedUser, setareUserLogat } = useBetween(useIdentity);
  const { callLoginMethod } = useUserMethods();
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const { width } = useBetween(useScreenSize);

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
    (user: GoogleCredentials) => {
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
        setError(currentTranslation[err.message] || err.message);
      });
    clearEnterPressed();
  }, [enterPressed, data, callLoginMethod, clearEnterPressed, onLogin]);

  // useEffect(() => {
  //   const initializeGapi = () => {
  //     gapi.load('auth2', () => {
  //       gapi.auth2.init({
  //         client_id: GOOGLECLIENTID,
  //       });
  //     });
  //   };

  //   initializeGapi();
  // }, []);

  return (
    <div className="flex flex-column center-v">
      <div style={{ marginBottom: '20px', marginTop: '15px' }}>
        {/* <MyLottie></MyLottie> */}
        <img src="/images/sign-in.png" style={{ maxWidth: '200px' }} />
      </div>

      <div className="mt10 fcenter mb10">
        <GoogleLoginButton
          onLogin={(data: GoogleCredentials) => {
            callLoginMethod(data)
              .then((res) => onLogin(res))
              .catch((err) => {
                setError(currentTranslation[err.message] || err.message);
              });
          }}
        ></GoogleLoginButton>
        {/* <MyButton
          text="Logare cu Google"
          onClick={() => {
            const auth2 = gapi.auth2.getAuthInstance();
            auth2
              .signIn()
              .then((googleUser) => {
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
        </MyButton> */}
      </div>

      <div className="">
        <LabelInput
          label={currentTranslation.ACCOUNT.email}
          onChange={(val: string) => updateData(val, 'email')}
          value={data.email}
        ></LabelInput>

        <div className="mt10">
          <LabelInput
            label={currentTranslation.ACCOUNT.password}
            // type="password"
            onChange={(val: string) => updateData(val, 'password')}
            value={data.password}
            type="password"
          ></LabelInput>
        </div>

        <div className="fcenter " style={{ marginTop: '20px' }}>
          <MyCheckbox
            id="remember"
            label={currentTranslation.ACCOUNT.rememberUser}
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
                  setError(currentTranslation[err.message] || err.message);
                })
            }
            text={currentTranslation.HEADERS.Login}
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          {error && <div className="mt10 error">{error}</div>}
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate('/parola')}
            text={currentTranslation.ACCOUNT.forgotPassword}
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate('/crearecont')}
            text={currentTranslation.ACCOUNT.navigateToCreateAccount}
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
