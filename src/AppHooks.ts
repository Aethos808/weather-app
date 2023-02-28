import axios, { AxiosResponse } from "axios";

type useAppHooksReturn = {
  weatherAPIResponse: Promise<AxiosResponse<any, any>>;
};

const useAppHooks = (location: string, days?: number): useAppHooksReturn => {
  // https://api.weatherapi.com/v1/forecast.json?key=65064bb192384bb7a41190112232802&q=02145&days=1
  const baseURL = "http://api.weatherapi.com/v1/forecast.json";
  const apiKey = `key=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const locationStr = `q=${location}`;
  const daysStr = days ? `days=${days}` : "days=7";

  return {
    weatherAPIResponse: axios.get(
      `${baseURL}?${apiKey}&${locationStr}&${daysStr}`
    ),
  };
};

export { useAppHooks };
