import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

export const BannerApiFunc = async () => {
  try {
    const response = await axiosInstance.get(endPoints.banner);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
