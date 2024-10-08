'use client'
import React, { useEffect, useState } from 'react';
// import Chat from '@/components/Chat';

// This page calls custom chatGPT agent function   /api/agent, 
 
import { useCompletion } from 'ai/react';


 
export default function SloganGenerator() {
  //call api rest /api/agent, this 
  const { completion, input, handleInputChange, handleSubmit, data,isLoading } =
    useCompletion({
      api: "/api/chatstream/datastream",
      onFinish: () => {
        console.log("yessssssss.........");
      },
    });

  useEffect(() => {
   
   console.log("test", completion);
  
  })
  

 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black"
          value={input}
          placeholder="Describe your business..."
          onChange={handleInputChange}
        />
      </form>
      {completion ? (
        <div className="whitespace-pre-wrap my-4">
          {completion}
          <p>xxx{data}</p>
        </div>
      ) : (
        <div>
          This is example of data stream it it returns exra data item as well as chat response
        </div>
      )}
    </div>
  );
}