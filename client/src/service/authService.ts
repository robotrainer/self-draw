import axiosInstance from "../api";

export default class AuthService {
  static async login(login: string, password: string): Promise<any> {
    return axiosInstance.post('/auth/login', {login, password});
  }

  static async register(login: string, password: string): Promise<any> {
    return axiosInstance.post('/auth/register', {login, password});
  }

  static async logout(): Promise<void> {
    return axiosInstance.post('/auth/logout');
  }

  static async checkAuth(): Promise<any> {
    return await axiosInstance.get('/auth');
  }
}