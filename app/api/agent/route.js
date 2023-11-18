import { NextResponse} from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import getLocation ,{getLocationDef}  from "@/components-api/getLocation"
import getCurrentWeather ,{getCurrentWeatherDef}  from "@/components-api/getCurrentWeather"



 
const openai = new OpenAI({
    apiKey: "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",
  });
 
 

// Set the runtime to edge for best performance
export const runtime = 'edge';
 

// async function getLocation() {
//     const response = await fetch("https://ipapi.co/json/");
//     const locationData = await response.json();
//     return locationData;
//   }
   
//   async function getCurrentWeather(latitude, longitude) {
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
//     const response = await fetch(url);
//     const weatherData = await response.json();
//     return weatherData;
//   }
   
  let functionDefinitions = []
  
   

 functionDefinitions.push(getLocationDef)
 functionDefinitions.push(getCurrentWeatherDef)





  const availableFunctions = {
    getCurrentWeather,
    getLocation,
  };
 
  
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant. Only use the functions you have been provided with. In your reply state the current wetaher and location`,
    },
  ];



export async function POST(req) {
  const { prompt } = await req.json();
 
  messages.push({
    role: "user",
    content:  prompt,
  });

    for (let i = 0; i < 5; i++) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        functions: functionDefinitions,
      });
   
      const { finish_reason, message } = response.choices[0];
   
      if (finish_reason === "function_call") {
        const functionName = message.function_call.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(message.function_call.arguments);
        const functionArgsArr = Object.values(functionArgs);
        const functionResponse = await functionToCall.apply(
          null,
          functionArgsArr
        );
   
        messages.push({
          role: "function",
          name: functionName,
          content: `
                  The result of the last function was this: ${JSON.stringify(
                    functionResponse
                  )}
                  `,
        });
      } else if (finish_reason === "stop") {
        messages.push(message);
        
        console.log(message)
        return new NextResponse(message.content);
      }
    }
    return NextResponse.json( "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.");
  }









