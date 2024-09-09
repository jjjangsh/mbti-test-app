import authInstance from "../axiosInstances/authInstance";

export const register = async (formData) => {
  const { data } = await authInstance.post("/register", formData);
  return data;
};

export const login = async (formData) => {
  const { data } = await authInstance.post("/login", formData);
  return data;
};

export const updateProfile = async (nickname, accessToken) => {
  const { data } = await authInstance.patch(
    "/profile",
    { nickname },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};
