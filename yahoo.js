// var yahooFinance = require('yahoo-finance');
// import yahooFinance from "yahoo-finance2";


const yahooFinance = require('yahoo-finance2').default; // NOTE the .default

// const a = yahooFinance.historical(
//   {
//     symbol: "AAPL",
//     from: "2012-01-01",
//     to: "2012-12-31",
//     // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
//   },
//   function (err, quotes) {
//     //...
//   }
// );

// This replaces the deprecated snapshot() API
async function q() {
    const a = await yahooFinance.search("AAPL");
    console.log(a)
    return a
}
q().then( (b) => console.log(b))

