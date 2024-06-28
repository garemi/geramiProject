import Axios from "axios";
import { Constants } from "@/constants/GlobalConstants.js";

const baseAPI = "user";

export const refreshToken = (Token) =>
  Axios.post(`${Constants.mainURL}/${baseAPI}/login/${Token.refresh_token}`);

export default {
  refreshToken,
};
