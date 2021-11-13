import api from "../../../lib/axios";
import { FormValues } from "../types";

export const registerWithEmailAndPassword = async (data: FormValues) => {
  return api.post("/auth/signUp", data).then((res) => res.data);
};
