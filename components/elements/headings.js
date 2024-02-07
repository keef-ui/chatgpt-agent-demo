import React from 'react';

const Heading = ({ variant, children }) => {
  // Define Tailwind classes based on the variant prop
  let headingClasses = '';
  switch (variant) {
    case 'h1':
      headingClasses = 'mb-2 text-4xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 break-words'; // Customize size and color for h1
      break;
    case 'h2':
      headingClasses = 'mb-2 text-2xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 break-words'; // Customize size and color for h2
      break;
    case 'h3':
      headingClasses = 'mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 break-words'; // Customize size and color for h3
      break;
    case 'h4':
      headingClasses = 'mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 break-words'; // Customize size and color for h4
      break;
    case 'h5':
      headingClasses = 'mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 break-words'; // Customize size and color for h5
      break;
    default:
      headingClasses = 'mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 break-words'; // Default styling
  }

  // Render the heading element with the specified classes
  const HeadingTag = variant;
  return <HeadingTag className={headingClasses}>{children}</HeadingTag>;
};

export default Heading;
