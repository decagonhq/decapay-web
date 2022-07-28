import axios from "axios";

export default axios.create({
  baseURL:process.env.REACT_APP_API_URL
});

export const headers = () => {
  return {
    headers: {
      // "Authorization": token ? `Bearer ${token}` : "",
      'DVC_KY_HDR': '2'
     }
  }
}


export const apiPost = (path, data, { headers, ...conf }, auth = true) => {
  const Authorization = auth && `Bearer ${localStorage.getItem("token")}`;
  const DVC_KY_HDR = '2';
  const config = {
    ...conf,
    headers: {
      Authorization,
      DVC_KY_HDR,
      ...(headers ? headers : {}),
    },
  };
  return axios.post(`${process.env.REACT_APP_API_URL}${path}`, data, config);
}
