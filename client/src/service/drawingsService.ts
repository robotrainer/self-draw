import { AxiosResponse } from "axios";
import axiosInstance from "../api";
import { DrawingResponse } from "../models/response/DrawingResponse";

export default class DrawingsService {
  static getAllDrawings(): Promise<AxiosResponse<DrawingResponse[]>>{
    return axiosInstance.get<DrawingResponse[]>('/drawings');
  }
}