import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


async function agent(userInput) {
  messages.push({
    role: "user",
    content: userInput,
  });
 
  for (let i = 0; i < 5; i++) {
    const response = await openai.chat.completions.create({
      model: "GPT-3.5",
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
      return message.content;
    }
  }
  return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";
}
 
const response = await agent(prompt);
 
console.log("response:", response);



