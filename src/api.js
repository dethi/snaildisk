import Dropbox from 'dropbox';

const ACCESS_TOKEN_KEY = 'dropbox_access_token';
const CURSOR_KEY = 'dropbox_cursor';

class API {
  constructor(options) {
    this.dbx = new Dropbox(options);
  }

  get cursor() {
    return window.localStorage.getItem(CURSOR_KEY) || null;
  }

  set cursor(newCursor) {
    window.localStorage.setItem(CURSOR_KEY, newCursor);
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

    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    this.dbx.setAccessToken(token);
    return true;
  }

  async getAccount() {
    const user = await this.dbx.usersGetCurrentAccount();
    return {
      email: user.email,
      firstname: user.name.given_name,
      lastname: user.name.surname,
      initials: user.name.abbreviated_name
    };
  }

  async getSpaceUsage() {
    const space = await this.dbx.usersGetSpaceUsage();
    return {
      used: space.used,
      allocated: space.allocation.allocated
    };
  }

  async listEntries() {
    let res = null;
    const cursor = this.cursor;
    if (!cursor) {
      res = await this.dbx.filesListFolder({ path: '', recursive: true });
    } else {
      res = await this.dbx.filesListFolderContinue({ cursor });
    }

    this.cursor = res.cursor;
    return res;
  }
}

export default new API({
  clientId: process.env.DROPBOX_CLIENT_ID,
  accessToken: window.localStorage.getItem(ACCESS_TOKEN_KEY)
});
