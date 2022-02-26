import { AxiosResponse } from "axios";
import axiosInstance from "../api";
import { IUser } from "../models/IUser";

export default class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse<IUser>> {
    return axiosInstance.post<IUser>('/auth/login', {login, password});
  }

  static async register(login: string, password: string): Promise<AxiosResponse<IUser>> {
    return axiosInstance.post<IUser>('/auth/register', {login, password});
  }

  static async logout(): Promise<void> {
    return axiosInstance.post('/auth/logout');
  }

  static async checkAuth(): Promise<AxiosResponse<IUser>> {
    return await axiosInstance.get<IUser>('/auth');
  }
}