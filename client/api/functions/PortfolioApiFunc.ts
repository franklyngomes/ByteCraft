import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

export const PortfolioApiFunc = async () => {
  try {
    const response = await axiosInstance.get(endPoints.portfolio);
    return response.data.data;
  } catch (error) {
    return error
  }
};
