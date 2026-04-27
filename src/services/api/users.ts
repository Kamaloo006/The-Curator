import z from "zod";
import { apiClient } from "./client";



const UserApiPayloadSchema = z.object({
  id:z.number(),
  name:z.string(),
  role:z.enum(['user','author']),
  bio:z.string(),
  avatar:z.string(),
  date:z.string(),
})

type UserApiPayload = z.infer<typeof UserApiPayloadSchema>;



interface UpdateUserInfoResponse {
  message: string;
  user: UserApiPayload;
}

interface ChangePasswordResponse {
  message: string;
}

export const updateUserInfo = async (
  userId: number,
  token: string,
  payload: FormData,
) => {
  const response = await apiClient.post<UpdateUserInfoResponse>(
    `/users/${userId}/update`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const changePassword = async (
  userId: number,
  token: string,
  data: { current_password: string; new_password: string },
) => {
  const response = await apiClient.post<ChangePasswordResponse>(
    `/users/${userId}/change_password`,
    {
      ...data,
      new_password_confirmation: data.new_password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
