import { clientId } from "./constants";
import SessionStorageManager from "./session-management";

class GoogleAuth {
  public static login = async () => {
    try {
      const gapi = (window as any).gapi;
      gapi.auth2.init({
        client_id: clientId,
      });

      return gapi.auth2
        .getAuthInstance()
        .signIn({
          prompt: "select_account",
        })
        .then((user) => {
          // const { profileObj } = user;

          const profile = user.getBasicProfile();
          const email = profile.getEmail();
          const password = profile.getId();
          return Promise.resolve({ email, password });
        });
    } catch (err) {
      console.log(err);
    }
  };
  public static logout = () => {
    const gapi = (window as any).gapi;
    gapi.auth2.init({
      client_id: clientId,
    });
    return gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(function () {
        console.log("User signed out.");
        SessionStorageManager.clear();
        return Promise.resolve();
      });
  };
}

export default GoogleAuth;
