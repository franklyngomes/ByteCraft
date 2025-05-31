import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

const CourseDetailsApiFunc = async(id: any) => {
 try {
    const response = await axiosInstance.get(endPoints.courseDetails+id);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export default CourseDetailsApiFunc