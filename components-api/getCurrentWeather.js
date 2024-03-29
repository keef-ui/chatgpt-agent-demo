export default async function getCurrentWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  }

// Scheme to describe the function
  // /* Definition for getCurrentEather - !!Note: the name item is the actual name of the function */
  export const getCurrentWeatherDef =     {
    name: "getCurrentWeather",
    description:
      "Get the current weather in a given location given in latitude and longitude",
    parameters: {
      type: "object",
      properties: {
        latitude: {
          type: "string",
        },
        longitude: {
          type: "string",
        },
      },
      required: ["longitude", "latitude"],
    },
  }

  