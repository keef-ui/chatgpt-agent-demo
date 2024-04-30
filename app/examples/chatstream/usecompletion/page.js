"use client";

import { useCompletion } from "ai/react";
import { useState, useCallback } from "react";

export default function PostEditorPage() {
  // Locally store our blog posts content
  const [content, setContent] = useState("");
  const { complete } = useCompletion({
    api: "/api/chatstream/usecompletion",
  });

  const checkAndPublish = useCallback(
    async (c) => {
      const completion = await complete(c);
      if (!completion) throw new Error("Failed to check typos");
      const typos = JSON.parse(completion);
      // you should add more validation here to make sure the response is valid
      if (typos?.length) {console.log(typos);}
      else {alert("Post published")}
    },
    [complete]
  );

  return (
    <div>
      <h1 className="font-bold text-2xl p-4">
        Post Editor (usecompletion example - link :
        https://sdk.vercel.ai/docs/api-reference/use-completion)
      </h1>
      <p className="font-bold text-2xl p-4">
        Check consle.log for lisof typo errors
      </p>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border-2"/>
      <button onClick={() => checkAndPublish(content)}>Publish</button>
    </div>
  );
}
