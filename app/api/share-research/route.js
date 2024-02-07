// import promptForDates from "./getDates.js"; // Adjust the path accordingly
import { NextResponse,NextRequest } from 'next/server';
import { formatDate, createDate } from "../freport/getDates"
import { searchResults, searchTerm } from "/crap/aa-webscarping/components/searchResults.js";
// import { searchResults, searchTerm } from "./test/mocksearchResults.js";


const todays_date = new Date(8.64e15);




  
export  async function GET(req, res) {
    //:TODO: pass numberOfWeeks, defaults to 3 at the moment
    // const numWeeks=req.nextUrl.searchParams.get('weeks')  // read url parmeters for number of weeks
   

        const search=req.nextUrl.searchParams.get('search')  // read url parmeters for search term
        const todays_date = new Date(8.64e15);

        let results = async (search=searchTerm[1]) => {let data = await  searchResults(todays_date, null, [search, "d"]) ;return data}

        const allresults = await results(search)

    if (req.method === 'GET') {


        searchResults(todays_date, null, [searchTerm[1], "d"])

        return NextResponse.json({message: allresults})
        // Process a POST request
      
      } else {
        // Handle any other HTTP method
        return NextResponse.json({message: ['error']})
      }
  }