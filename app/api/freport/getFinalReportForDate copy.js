import axios from "axios"
import cheerio  from "cheerio";
import Cors from 'cors';

//This will return and   2 diemnsional array for each date called upComingFinals  format is :[ [ '01-Feb-2024', [[date,title,link...] [date,title,link...]] ]]
//If there is no reports for that day then an mepty arry is returned
//to get title of first element do something like upComingFinals[0][0][0] 


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

// Function to format a date into "01-Sep-2023" format
function formatDate(date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${formattedDay}-${month}-${year}`;
}



// Define the base URL of the website you want to scrape
const baseUrl =
  "https://www.lse.co.uk/share-prices/financial-diary.html?selected-date="; // Replace with the base URL

 // Create an Axios instance with a custom user agent
const customAxios = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
  },
});

const todaysDate = formatDate(new Date)

// Function to scrape data for a date
export async function scrapeDataForDate(date=todaysDate) {  //TODO: if null set to todays date as a string
  const queryParams = `${date}`;
  const url = `${baseUrl}${queryParams}`;


  try {
    const response = await customAxios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);


      // Find sections containing an h3 with text containing "Final Reports" then loop throgh extracting the deatils
      const upComingFinals = [];
      $(".financial-diary__section").each((index, element) => {
        const $section = $(element);
        const $h3 = $section.find("h3");

        if ($h3.text().includes("Final Results")) {
          
          /* find adjacent table and push the rows    */
           const $table = $h3.next("table");
           const tableRows = [];

           if ($table.length > 0) {
             $table.find("tr").each((index, rowElement) => {
               const rowData = [];
               $(rowElement)
                 .find("td")
                 .each((index, cellElement) => {
                   rowData.push($(cellElement).text());
                 });
               tableRows.push(rowData);
             });
               // Print the table rows
               console.log("Table Rows:");
               console.table(tableRows);

             // Push the table rows for each comapnies that have final reports (This will be 2Dimensional array, grouped by date)
             upComingFinals.push([date, tableRows]);
           } else {
             console.log("No adjacent table found.");
           }
        }
      });
      console.log(upComingFinals)
      return upComingFinals; // Return the titles , dates and  links 
    }
  } catch (error) {
    console.error(`Error for date ${date}:`, error);
    return []; // Return an empty array for this page in case of an error
  }
}


