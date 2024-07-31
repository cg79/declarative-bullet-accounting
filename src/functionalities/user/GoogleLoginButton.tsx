import React, { useEffect, useRef } from 'react';
import { utils } from '../../_utils/utils';
import { GOOGLECLIENTID } from './constants';

const GoogleLoginButton = () => {
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

    google.accounts.id.prompt(); // Display the One Tap dialog if not already displayed
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
        debugger;
        if (window.google) {
          initializeClient();

          renderLoginButton();
        }
      }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    debugger;
    console.log('Encoded JWT ID token: ' + response.credential);
    // Send the ID token to your backend for verification and authentication
  };

  return (
    <div>
      <div ref={googleSignInButton}></div>
    </div>
  );
};

export default GoogleLoginButton;
