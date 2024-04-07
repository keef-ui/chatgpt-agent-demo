// import promptForDates from "./getDates.js"; // Adjust the path accordingly
import { NextResponse, NextRequest } from "next/server";
import { formatDate, createDate } from "../freport/getDates";
import {
  searchResults,
  searchTerm,
} from "/temp-crap/aa-webscrapping-ai/aa-webscrapping-nodejs/components/searchResults.js";


const todays_date = new Date(8.64e15);

export async function GET(req, res) {
  //This gets news articles for search term passed in url

  const search = req.nextUrl.searchParams.get("search"); // read url parmeters for search term
  const todays_date = new Date(8.64e15);

  try {
    const allresults = await searchResults(todays_date, null, [search, "d"]);
    return NextResponse.json({ message: allresults });
  } catch (error) {
    // Handle any other HTTP method
    return NextResponse.json({ message: ["error"] });
  }
}
