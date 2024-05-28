import { OpenAIStream, StreamingTextResponse, experimental_StreamData } from "ai";
import OpenAI from "openai";

// tips how to use https://github.com/vercel/ai/issues/930
//https://github.com/vercel/ai/pull/425

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req) {

const messages=[]
    const { prompt } = await req.json();

    messages.push({
      role: "user",
      content: prompt,
    });

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

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages,
    functions,
  });

  // Instantiate the StreamData. It works with all API providers.
  const data = new experimental_StreamData();

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      if (name === "get_current_weather") {
        // Call a weather API here
        const weatherData = {
          temperature: 20,
          unit: args.format === "celsius" ? "C" : "F",
        };

        data.append({
          text: "Some custom data ...................datatatatatsdhbhsbjhsdf.....----->",
        });

        const newMessages = createFunctionCallMessages(weatherData);
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: "gpt-3.5-turbo-0613",
        });
      }
    },
    onCompletion(completion) {
      console.log("completion", completion);
    },
    onFinal(completion) {
      // IMPORTANT! you must close StreamData manually or the response will never finish.
      data.close();
    },
  });

  data.append({
    text: "Hello, how are you?",
  });

  // IMPORTANT! If you aren't using StreamingTextResponse, you MUST have the `X-Experimental-Stream-Data: 'true'` header
  // in your response so the client uses the correct parsing logic.
  return new StreamingTextResponse(stream,{},data);
}
