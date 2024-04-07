'use client'
import React, { useEffect, useState, useRef} from 'react';
// import Chat from '@/components/Chat';

// This page calls custom chatGPT agent function   /api/agent, 
 
import { useCompletion } from 'ai/react';


 
export default function SloganGenerator() {
  //call api rest /api/agent, this 
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({ api: '/api/agent-lap'});
  const container = useRef();

  
 
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
        <div className="whitespace-pre-wrap my-4">{completion}</div>
      ) : (
        <div>
          Please suggest some activities based on my location and the weather.

        </div>
      )}
    </div>
  );
}