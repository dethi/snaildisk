import { Dropbox } from 'dropbox';

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

  async getAccount() {
    const user = await this.dropbox.usersGetCurrentAccount();
    return {
      email: user.email,
      firstname: user.name.given_name,
      lastname: user.name.surname,
      initials: user.name.abbreviated_name
    };
  }

  async getSpaceUsage() {
    const space = await this.dropbox.usersGetSpaceUsage();
    return {
      used: space.used,
      allocated: space.allocation.allocated
    };
  }
}

const api = new API(process.env.REACT_APP_DROPBOX_CLIENT_ID);

export default api;
