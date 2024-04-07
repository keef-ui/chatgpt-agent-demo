import { NextResponse, NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req, res) {
  const symbol = req.nextUrl.searchParams.get('symbol'); // read url parmeters for search term
  try {
    // const symbol = "AAPL"; // Default to AAPL if no symbol provided
    const stockData = await yahooFinance.quoteSummary(symbol, {modules: ["summaryProfile","price",]});

    // Extract relevant information (e.g., stock price, company name, etc.)
    // const { regularMarketPrice, shortName } = stockData[0];

    const { quotes, news } = stockData; // can also destructure news ie {quotes,news}

    return NextResponse.json({
      data: { stockData },
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({
      message: ["error fetching quote from yahoo symbol:" + symbol],
    });
  }
}
