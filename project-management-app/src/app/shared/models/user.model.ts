export type UserDataResponse = {
  id: string;
  login: string;
  name: string;
};

export class User {
  id: string;

  login: string;

  name: string;

  constructor(res: UserDataResponse) {
    this.name = res.name;
    this.login = res.login;
    this.id = res.id;
  }
}
