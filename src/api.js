import Dropbox from 'dropbox';


const SESSION_ACCESS_TOKEN = 'dropbox_access_token';

class API {
  constructor(options) {
    this.dbx = new Dropbox(options);
  }

  isAuthenticated() {
    return !!this.dbx.getAccessToken();
  }

  getAuthenticationUrl(url) {
    return this.dbx.getAuthenticationUrl(url);
  }

  setAccessToken(token) {
    if (!token) {
      return false;
    }

    window.sessionStorage.setItem(SESSION_ACCESS_TOKEN, token);
    this.dbx.setAccessToken(token);
    return true;
  }

  async getAccount() {
    const user = await this.dbx.usersGetCurrentAccount();
    return {
      email: user.email,
      firstname: user.name.given_name,
      lastname: user.name.surname,
      initials: user.name.abbreviated_name,
    };
  }

  async getSpaceUsage() {
    const space = await this.dbx.usersGetSpaceUsage();
    return {
      used: space.used,
      allocated: space.allocation.allocated,
    };
  }

  listEntries(cursor) {
    if (!cursor) {
      return this.dbx.filesListFolder({ path: '', recursive: true });
    }
    return this.dbx.filesListFolderContinue({ cursor });
  }
}

export default new API({
  clientId: process.env.DROPBOX_CLIENT_ID,
  accessToken: window.sessionStorage.getItem(SESSION_ACCESS_TOKEN),
});
