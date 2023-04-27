export interface User {
  avatar: string,
  name: string,
}

export default class UserStorage {
  constructor (private readonly key: string) {}

  get (): User | null {
    const userStr = localStorage.getItem(this.key);
    return userStr ? JSON.parse(userStr) : null;
  }

  set (user: User | null){
    return localStorage.setItem(this.key, JSON.stringify(user));
  }
}
