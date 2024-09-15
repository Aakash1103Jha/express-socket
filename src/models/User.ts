export default class User {
  username: string;
  siteId: string;

  constructor(username: string, siteId: string) {
    this.username = username;
    this.siteId = siteId;
  }
}
