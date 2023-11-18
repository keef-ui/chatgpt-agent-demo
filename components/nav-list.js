import React from 'react';

// List component that receives an array of items. It will contain list item content text and , svg icon data
const List = ({ items }) => {
  return (
    <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
      {items.map((item, index) => (
        <ListItem key={index} content={item.content} svgData={item.svgData} />
      ))}
    </ul>
  );
};

const ListItem = ({ content, svgData }) => {
  return (
    <li className="relative">
      <a
        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref
      >
        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            {svgData}
          </svg>
        </span>
        <span>{content}</span>
      </a>
    </li>
  );
};

export default List;

