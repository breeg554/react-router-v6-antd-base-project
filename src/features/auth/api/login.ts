import api from "../../../lib/axios";
export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO) => {
  return api.post("/auth/signIn", data).then((res) => res.data);
};
