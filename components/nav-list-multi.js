import React from 'react';

const items = [
    {
      text: 'Link 1',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          {/* ...SVG path */}
        </svg>
      ),
    },
    {
      text: 'Category 1',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-4 w-4"
        >
          {/* ...SVG path */}
        </svg>
      ),
      subItems: [
        { text: 'Link 2' },
        { text: 'Link 3' },
      ],
    },
    // Add more items as needed
  ];

const MultiList = () => {
    const renderSubItems = (subItems) => {
      return (
        <ul className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block " data-te-sidenav-collapse-ref>
          {subItems.map((subItem, index) => (
            <li key={index} className="relative">
              <a
                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >
                {subItem.icon && (
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    {subItem.icon}
                  </span>
                )}
                <span>{subItem.text}</span>
              </a>
            </li>
          ))}
        </ul>
      );
    };
  
    return (
      <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
        {items.map((item, index) => (
          <li key={index} className="relative">
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref
            >
              {item.icon && (
                <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                  {item.icon}
                </span>
              )}
              <span>{item.text}</span>
              {item.subItems &&(<span
          class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
          data-te-sidenav-rotate-icon-ref>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd" />
          </svg>
        </span>)}
            </a>
           

            {item.subItems && renderSubItems(item.subItems)}
          </li>
        ))}
      </ul>
    );
  };
  
  export default MultiList;