import React from 'react';

const Button = ({ type, children, onClick, icon, dataAttributes }) => {
  let buttonStyles = 'my-2 py-2 px-4 rounded flex items-center focus:outline-none';

  // Apply different styles based on the button type
  switch (type) {
    case 'primary':
      buttonStyles += ' bg-blue-500 text-white hover:bg-blue-700';
      break;
    case 'secondary':
      buttonStyles += ' bg-gray-300 text-gray-800 hover:bg-gray-400';
      break;
    case 'tertiary':
      buttonStyles += ' bg-green-500 text-white hover:bg-green-700';
      break;
    default:
      // Default to primary styles if type is not specified or invalid
      buttonStyles += ' bg-blue-500 text-white hover:bg-blue-700';
  }

  //To do add another for size, ie sm, medium, large

  return (
    <button className={buttonStyles} onClick={onClick} {...dataAttributes}>
      {icon && <i className={`mr-2 ${icon}`} />} {/* Render the icon if provided */}
      {children}
    </button>
  );
};

export default Button;