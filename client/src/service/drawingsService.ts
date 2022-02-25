import axiosInstance from "../api";

export default class DrawingsService {
  static getAllDrawings(): Promise<any> {
    return axiosInstance.get('/drawings');
  }
}