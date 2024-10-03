import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, username, password, role, image) => {
  // khi truyền kèm theo file thì bắt buộc phải truyền bằng form data
  const data = new FormData();
  data.append("email", email);
  data.append("username", username);
  data.append("password", password);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const putUpdateUser = (id, username, role, image) => {
  // khi truyền kèm theo file thì bắt buộc phải truyền bằng form data
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

export { postCreateNewUser, getAllUsers, putUpdateUser };
