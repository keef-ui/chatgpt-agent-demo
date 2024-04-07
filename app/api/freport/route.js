import { NextResponse,NextRequest } from 'next/server';
import { reportList } from "/temp-crap/aa-webscrapping-ai/aa-webscrapping-nodejs/nexjs/finalReportsForBatchOfDates";

export  async function GET(req, res) {
    //:TODO: pass numberOfWeeks, defaults to 3 at the moment
    const numWeeks=req.nextUrl.searchParams.get('weeks')  // read url parmeters for number of weeks
   
    let report = async (numWeeks=3) => {let data = await reportList(numWeeks) ;return data}

        const reportListFetched= await report(numWeeks)

    if (req.method === 'GET') {
        // Process a POST request
        return NextResponse.json({message: reportListFetched})
      } else {
        // Handle any other HTTP method
        return NextResponse.json({message: ['errooorrrrrrrrrrrrrrrrr']})
      }
  }