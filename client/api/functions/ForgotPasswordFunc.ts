import axios from "axios";
import { endPoints } from "../endpoints/endPoints";

const ForgotPasswordFunc = async(formData: any) => {
  try {
    const response = await axios.post(`http://localhost:5000${endPoints.forgot_password}`, formData);
    if(response?.data?.status == true){
      return response.data;
    }else{
      return response
    }
  } catch (error) {
    console.log(error);
  }
}
export default ForgotPasswordFunc