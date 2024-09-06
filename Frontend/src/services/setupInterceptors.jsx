/**
 * Function to set up Axios interceptors with exception routes.
 * @param {object} axiosInstance - The Axios instance to set up interceptors on.
 * @param {array} exceptionRoutes - Array of routes to be excluded from interceptors.
 */
import authService from "./authServices";
const token = localStorage.getItem("token");

const setupInterceptors = (axiosInstance, exceptionRoutes) => {

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    function (config) {
      if (!exceptionRoutes.includes(config.url)) {
        config.headers["authorization"] = token;
      } else {
        // console.log("Request Interceptor Bypassed:", config);
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (!exceptionRoutes.includes(originalRequest.url) && error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          console.log("ERROR 401", error.response.data.message);
          console.log("Unauthorized, refreshing token...");

          try {
            const newToken = await authService.refreshToken();
            if (!newToken) {
              await authService.logout();
              return Promise.reject(error);
            }
           localStorage.setItem("token", newToken);
            // window.location.reload();
            originalRequest.headers["authorization"] = newToken;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.log("Refresh token failed:", refreshError);
            await authService.logout();

            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
