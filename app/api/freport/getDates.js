// datePrompt.js


function isValidDateString(dateString) {
  // Check if the input has the specified format (dd-mm-yyyy)
  const dateComponents = dateString.split('-');
  if (dateComponents.length === 3) {
    const day = parseInt(dateComponents[0]);
    const month = parseInt(dateComponents[1]);
    const year = parseInt(dateComponents[2]);

    // Check if day, month, and year are valid
    return isValidDay(day, month, year) && isValidMonth(month) && isValidYear(year);
  }

  return false;
}

function isValidDay(day, month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  return !isNaN(day) && day >= 1 && day <= daysInMonth;
}

function isValidMonth(month) {
  return !isNaN(month) && month >= 1 && month <= 12;
}

function isValidYear(year) {
  return !isNaN(year) && year >= 1900; // Adjust the minimum year as needed
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

export function getTodaysDate() {
  return new Date().setHours(0,0,0,0)
}

export function createDateFromDateString(dateString) {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`).setHours(0,0,0,0)
  ;
}

// Function to format a date into "01-Sep-2023" format
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function formatDate(date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${formattedDay}-${month}-${year}`;
}

export function createDate(dateString) {
  if (isValidDateString(dateString)) {
    const newDate = createDateFromDateString(dateString);
    if (isValidDate(newDate))  return newDate
    return null
  }
}

