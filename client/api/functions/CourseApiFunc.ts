import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

const CourseApiFunc = async() => {
  try {
    const response = await axiosInstance.get(endPoints.course);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
export default CourseApiFunc