import http from "../../utils/http";
import APIs from "./APIs";

export const findUser = async (email: string) => {
  return http.get(`${APIs.FIND_USER}?email=${email}`);
};