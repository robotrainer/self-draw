import { makeAutoObservable } from "mobx";
import AuthService from "../service/authService";

interface User {
  id: number;
  login: string;
}

export default class Store {
  user = {} as User;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(login: string, password: string) {
    await AuthService.login(login, password).then((res) => {
      localStorage.setItem('auth', 'true');
      this.setAuth(true);
      this.setUser(res.data);
    }).catch ((error) => console.log(error.response.data.message));
  }

  async register(login: string, password: string) {
    await AuthService.register(login, password).then((res) => {
      this.setUser(res.data);
    }).catch ((error) => console.log(error.response.data.message));
  }

  async logout() {
    await AuthService.logout().then(() => {
      localStorage.removeItem('auth');
      this.setAuth(false);
      this.setUser({} as User);
    }).catch ((error) => console.log(error.response.data.message));
  }

  async checkAuth() {
    this.setLoading(true);
    await AuthService.checkAuth().then((res) => {
      this.setAuth(true);
      this.setUser(res.data);
    }).catch( (error) => {
      console.log(error.toJSON());
    }).finally(() => this.setLoading(false));
  }
}