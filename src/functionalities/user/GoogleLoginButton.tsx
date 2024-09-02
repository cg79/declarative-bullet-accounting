import React, { useEffect, useRef } from 'react';
import { utils } from '../../_utils/utils';
import { GOOGLECLIENTID } from './constants';
// import { gapi } from 'gapi-script';

export interface GoogleCredentials {
  email: string;
  password: string;
  provider?: string;
  nick?: string;
}

const GoogleLoginButton = ({
  onLogin,
}: {
  onLogin: (user: GoogleCredentials) => void;
}) => {
  const googleSignInButton = useRef<HTMLDivElement>(null);

  const initializeClient = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLECLIENTID,
      callback: handleCredentialResponse,
    });
  };

  const renderLoginButton = () => {
    if (!googleSignInButton?.current) {
      return;
    }
    google.accounts.id.renderButton(googleSignInButton.current, {
      theme: 'outline',
      size: 'large',
    });

    //google.accounts.id.prompt(); // Display the One Tap dialog if not already displayed
  };

  useEffect(() => {
    if (window.google) {
      initializeClient();
      renderLoginButton();
      return;
    }

    console.log('Google SDK not loaded');
    utils.injectScript(
      'https://accounts.google.com/gsi/client',
      'google-login',
      () => {
        if (window.google) {
          initializeClient();

          renderLoginButton();
        }
      }
    );
  }, []);

  function decodeJwtResponse(token) {
    // Split the JWT into its three parts
    const parts = token.split('.');

    // Decode Base64Url encoded parts
    const header = JSON.parse(
      atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))
    );
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    const signature = parts[2];

    // Return the decoded parts as an object
    return {
      header: header,
      payload: payload,
      signature: signature,
    };
  }

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    const responsePayload = decodeJwtResponse(response.credential);

    console.log(responsePayload);
    const { payload } = responsePayload;
    const credentials: GoogleCredentials = {
      email: payload.email,
      password: payload.sub,
      provider: 'google',
      nick: payload.given_name,
    };
    onLogin(credentials);

    //  console.log("ID: " + responsePayload.sub);
    //  console.log('Full Name: ' + responsePayload.name);
    //  console.log('Given Name: ' + responsePayload.given_name);
    //  console.log('Family Name: ' + responsePayload.family_name);
    //  console.log("Image URL: " + responsePayload.picture);
    //  console.log("Email: " + responsePayload.email);

    // Send the ID token to your backend for verification and authentication
    // if (gapi.auth2.isSignedIn.get()) {
    //   var profile = gapi.auth2.currentUser.get().getBasicProfile();
    //   console.log('ID: ' + profile.getId());
    //   console.log('Full Name: ' + profile.getName());
    //   console.log('Given Name: ' + profile.getGivenName());
    //   console.log('Family Name: ' + profile.getFamilyName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail());
    // }
  };

  return (
    <div>
      <div ref={googleSignInButton}></div>
    </div>
  );
};

export default GoogleLoginButton;
