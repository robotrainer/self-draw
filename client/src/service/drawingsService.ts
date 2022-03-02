import { AxiosResponse } from "axios";
import axiosInstance from "../api";
import { Drawing } from "../models/Drawing";
import { PublishDrawing } from '../models/PublishDrawing'
import { DrawingResponse } from "../models/response/DrawingResponse";

export default class DrawingsService {
  static getAllDrawings(): Promise<AxiosResponse<DrawingResponse[]>>{
    return axiosInstance.get<DrawingResponse[]>('/drawings');
  }

  static getSortedDrawings(): Promise<AxiosResponse<DrawingResponse[]>>{
    return axiosInstance.get<DrawingResponse[]>('/drawings/sorted');
  }

  static createDrawing(drawing: Drawing): Promise<AxiosResponse<DrawingResponse>> {
    return axiosInstance.post<DrawingResponse>('/drawings', drawing);
  }

  static getDrawingsUser(): Promise<AxiosResponse<DrawingResponse[]>> {
    return axiosInstance.get<DrawingResponse[]>('/drawings/user');
  }

  static publishDrawing(drawing: PublishDrawing): Promise<AxiosResponse<DrawingResponse>> {
    return axiosInstance.patch<DrawingResponse>('/drawings/publish', drawing);
  }
}