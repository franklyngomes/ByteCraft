import axios from "axios";
import { endPoints } from "../endpoints/endPoints";

const SignoutFunc = async () => {
  try {
    const response = await axios.get(`http://localhost:5000${endPoints.signout}`);
    if(response?.data.status === true){
      return response.data;
    }else{
      return response
    }
  } catch (error) {
    return error
  }
}
export default SignoutFunc