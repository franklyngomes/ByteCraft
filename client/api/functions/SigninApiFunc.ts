import axios from "axios";
import { endPoints } from "../endpoints/endPoints";

const SigninFunc = async (formData: any) => {
  try {
    const response = await axios.post(`http://localhost:5000${endPoints.signin}`, formData);
    if(response?.data.status === true){
      return response.data;
    }else{
      return response
    }
  } catch (error) {
    return error
  }
}
export default SigninFunc