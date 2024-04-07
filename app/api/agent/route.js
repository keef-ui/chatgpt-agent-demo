import { NextResponse} from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import getLocation ,{getLocationDef}  from "@/components-api/getLocation"
import getCurrentWeather ,{getCurrentWeatherDef}  from "@/components-api/getCurrentWeather"


/* base code taken from here https://cookbook.openai.com/examples/how_to_build_an_agent_with_the_node_sdk  */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
 

// Set the runtime to edge for best performance
export const runtime = 'edge';
 
   
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
      content: `You are a helpful assistant. Only use the functions you have been provided with. In your reply state the current weather and location`,
    },
  ];



export async function POST(req) {
  const { prompt } = await req.json();
 
  messages.push({
    role: "user",
    content:  prompt,
  });

    //Loop to send mesgages and respose back and forth. it will do this upto 5 times then it assumes it cant find answer
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









