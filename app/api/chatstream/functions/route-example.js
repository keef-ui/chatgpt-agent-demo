import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";


// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const dynamic = "force-dynamic";

// Function definition:
const functions = [
  {
    name: "get_current_weather",
    description: "Get the current weather",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
        format: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description:
            "The temperature unit to use. Infer this from the users location.",
        },
      },
      required: ["location", "format"],
    },
  },
];

const messages=[]

// And use it like this:
export async function POST(req) {
  const { prompt } = await req.json();

 messages.push({
   role: "user",
   content: prompt,
 });

 console.log(prompt)
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages,
    functions,
  });

const stream = OpenAIStream(response, {
  experimental_onFunctionCall: async (
    { name, arguments: args },
    createFunctionCallMessages
  ) => {
    // if you skip the function call and return nothing, the `function_call`
    // message will be sent to the client for it to handle
    if (name === "get_current_weather") {
      // Call a weather API here
      const weatherData = {
        temperature: 20,
        unit: args.format === "celsius" ? "C" : "F",
      };

      // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
      const newMessages = createFunctionCallMessages(weatherData);
      return openai.chat.completions.create({
        messages: [...messages, ...newMessages],
        stream: true,
        model: "gpt-3.5-turbo-0613",
        // see "Recursive Function Calls" below
        functions,
      });
    }
  },
});

  return new StreamingTextResponse(stream);
}
