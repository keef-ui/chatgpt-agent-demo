"use client";

import { useChat } from "ai/react";

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chatstream/usechat",
  });

  return (
    <div>
      <h2 className="font-bold text-2xl p-4">
        Baisc example of chat stream, using useChat (Link :
        https://sdk.vercel.ai/docs/api-reference/use-chat
        )</h2>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
