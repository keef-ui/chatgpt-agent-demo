import { NextResponse } from 'next/server';
import {reportList}  from "/crap/aa-webscarping/nexjs/finalReportsForBatchOfDates"

export  async function GET(req, res) {
    let report = async () => {let data = await reportList() ;return data}

        const reportListFetched= await report()

    if (req.method === 'GET') {
        // Process a POST request
        return NextResponse.json({message: reportListFetched})
      } else {
        // Handle any other HTTP method
        return NextResponse.json({message: ['errooorrrrrrrrrrrrrrrrr']})
      }
  }