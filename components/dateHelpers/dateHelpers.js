import React from "react";
import { isWithinInterval, startOfWeek, endOfWeek, parse } from "date-fns";

const parseDateString = (dateString) => {
  // Define the format of the input date string
  const dateFormat = "dd-MMM-yyyy";
  // Parse the date string into a Date object
  const parsedDate = parse(dateString, dateFormat, new Date());
  return parsedDate;
};

export const isDateInThisWeek = (dateString) => {
  const date = parseDateString(dateString);
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 0 });
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 0 });

  return isWithinInterval(date, {
    start: startOfThisWeek,
    end: endOfThisWeek,
  });
};
