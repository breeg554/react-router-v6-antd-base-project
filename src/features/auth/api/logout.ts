import api from "../../../lib/axios";

export const logout = async () => {
  return api.post("/auth/logOut");
};
