import axios, { AxiosError } from "axios";

const API_URL = "https://probable-invention-x5r59jqgj5gqhv67p-3000.app.github.dev/api";

export const getSeismicData = async (city: string): Promise<SeismicData> => {
  return new Promise<SeismicData>((resolve, reject) => {
    axios
      .get(`${API_URL}/seismic/${city}`)
      .then((res) => {
        resolve({
          city: city,
          magnitude: res.data.magnitude,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
