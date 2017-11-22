import Dropbox from 'dropbox';

class API {
  constructor(clientId) {
    this.dropbox = new Dropbox({ clientId });
  }

  setAccessToken(token) {
    this.dropbox.setAccessToken(token);
  }

  getAuthenticationUrl() {
    const redirectUrl = process.env.REACT_APP_DROPBOX_REDIRECT_URL;
    return this.dropbox.getAuthenticationUrl(redirectUrl);
  }
}

const api = new API(process.env.REACT_APP_DROPBOX_CLIENT_ID);

export default api;
