export default async function getLocation() {
    const response = await fetch("https://ipapi.co/json/");
    const locationData = await response.json();
    return locationData;
  }

 
  export const getLocationDef = {
    name: "getLocation",
    description: "Get the user's location based on their IP address",
    parameters: {
      type: "object",
      properties: {},
    }
  }

