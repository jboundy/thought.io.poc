import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL =
  "https://c5f33d76-fd50-4ca8-b864-a9aa8b77fc27.e1-us-east-azure.choreoapps.dev/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  register: (url: string, body: {}) => axios.post(url, body),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

const thought = {
  newMessage: (values: any) => requests.post("/thought", values),
};

const agent = {
  thought,
};

export default agent;
