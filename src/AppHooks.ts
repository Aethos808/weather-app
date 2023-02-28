import axios from "axios";
import React, { useEffect, useState } from "react";

type UseAppHooksReturn = {
  weatherAPIResponse: unknown;
};

type DayCondition = {
  text: string;
  icon: string;
};

type Day = {
  dayOfTheWeek: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  rain: boolean;
  snow: boolean;
  summary: DayCondition;
};

const useAppHooks = (location: string, days?: number): UseAppHooksReturn => {
  const baseURL = "https://api.weatherapi.com/v1/forecast.json";
  const apiKey = `key=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const locationStr = `q=${location}`;
  const daysStr = days ? `days=${days}` : "days=7";

  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    fetchWeatherApiResponse(
      baseURL,
      apiKey,
      locationStr,
      daysStr,
      setWeatherData
    );
  }, [location]);

  console.log(weatherData);

  return {
    weatherAPIResponse: weatherData,
  };
};

const fetchWeatherApiResponse = async (
  baseURL: string,
  apiKey: string,
  locationStr: string,
  daysStr: string,
  setter: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  try {
    const { data } = await axios.get(
      `${baseURL}?${apiKey}&${locationStr}&${daysStr}`
    );

    //curr.hour is hourly forecast info, only needed for first day
    //curr.day is daily forecast info, needed for every day
    //curr.date
    //curr.date_epoch
    //curr.day.maxtemp_f
    //curr.day.mintemp_f
    //curr.day.daily_will_it_rain
    //curr.day.daily_will_it_snow
    //curr.day.condition
    console.log(data);

    const weatherInfo = data.forecast.forecastday.reduce(
      (acc: Day[], curr: any) => {
        console.log(acc);

        acc.push({
          dayOfTheWeek: new Date(curr.date_epoch * 1000)
            .toDateString()
            .substring(0, 3),
          date: curr.date,
          maxTemp: curr.day.maxtemp_f,
          minTemp: curr.day.mintemp_f,
          rain: curr.day.daily_will_it_rain,
          snow: curr.day.daily_will_it_snow,
          summary: curr.day.condition,
        });

        return acc;
      },
      []
    );

    console.log(weatherInfo);

    /**
     * reduced data for current weather:
     * current: {
     *   temp_f: number
     *   temp_c: number
     *   condition: {
     *     text: string
     *     icon: string
     *   }
     * }
     */

    setter(data);
  } catch (err) {
    console.error(err);
  }
};

export { useAppHooks };
