"use client";
import { useEffect } from "react";
import Nav from "../../components/nav"
import Main from "../../components/main"

const MyComponent = () => {
  useEffect(() => {
    const init = async () => {
      const { initTE,  Sidenav } = await import(
        "tw-elements"
      );

      initTE({ Sidenav });
    };
    init();
  }, []);

  return (
        <>

<Nav items={items}/>
<Main />


        </>
  );
};

export default MyComponent
  

const items = [
  {
    content: 'Link 1', // The text content for the list item
    svgData: (
      <path
        // SVG path or any other valid SVG element
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
      />
    ),
  },
  {
    content: 'Category 1',
    svgData: (
      <path
        // Another SVG path or any valid SVG element
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
        clip-rule="evenodd"
      />
    ),
  },
  // ... Additional items with the same structure
];