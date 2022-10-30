import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({ showSpinner: false, trickleSpeed: 50 });

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Get access token from redux store (outside of react component)
    const accessToken = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();

    const email = store?.getState()?.user?.account?.email;
    const refresh_token = store?.getState()?.user?.account?.refresh_token;
    // Token expired
    if (error?.response?.data && error.response.data.EC === -999) {
      const res = axios.post("api/v1/refresh-token", { email, refresh_token });

      if (res && res.EC === 0) {
        store.dispatch({
          type: "FETCH_USER_LOGIN_SUCCESS",
          payload: {
            access_token: res?.DT?.access_token,
            refresh_token: res?.DT?.refresh_token,
            username: store?.getState()?.user?.account?.username,
            image: store?.getState()?.user?.account?.image,
            role: store?.getState()?.user?.account?.role,
            email: store?.getState()?.user?.account?.email,
          },
        });
      } else {
        window.location.href = "/login";
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
