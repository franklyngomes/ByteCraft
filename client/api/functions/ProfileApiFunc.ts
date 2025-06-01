import { endPoints } from "../endpoints/endPoints";
import axios from "axios";

const ProfileApiFunc = async(id : any) => {
  try {
    const response = await axios.get(`http://localhost:5000${endPoints.profile}`+id)
    if(response?.data?.status === true){
      return response.data.data
    }else{
      response
    }
  } catch (error) {
    console.log(error)
  }
}
export default ProfileApiFunc