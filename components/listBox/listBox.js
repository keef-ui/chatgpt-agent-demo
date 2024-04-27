import { useState, useEffect, useContext} from "react";
import { isDateInThisWeek } from "../dateHelpers/dateHelpers";
import {
  Collection,
  Header,
  ListBox as ListBoxAria,
  ListBoxItem,
  Section,
  Text,
  Button
} from "react-aria-components";





export default function ListBox({dataArray}) {

      const [convertedArray, setConvertedArray] = useState([]);
     useEffect (()=>{

        const convertArray = (array) => {
          return array.map((item, index) => ({
            id: index + 1,
            date: item[0],
            companyName: item[1],
            ticker: item[2],
          }));
        };

   var filteredItems = dataArray.filter(function (item) {
     return isDateInThisWeek(item[0]);
   });

          const result = convertArray(filteredItems);

       
          setConvertedArray(result);
    

     },[convertedArray])
      
     
        
  return (
    <div className=" flex justify-center mb-4 ">
      <ListBoxAria
        aria-label="Contacts"
        selectionMode="multiple"
        selectionBehavior="replace"
        className="w-full max-h-[290px] overflow-auto outline-none bg-white text-gray-700 p-2 flex flex-col gap-2 rounded-lg shadow scroll-pb-2 scroll-pt-7 overflow-x-hidden"
      >
        <BoxSection title="Upcoming Finals (This week)" items={convertedArray}>
          {(item) => <Item item={item} />}
        </BoxSection>
      </ListBoxAria>
    </div>
  );
}

function BoxSection({ title, children, items }) {
  return (
    <Section>
      <Header className="sticky -top-2 bg-white z-10 font-medium f px-2 mb-1 text-slate-700">
        {title}
      </Header>
      <Collection items={items}>{children}</Collection>
    </Section>
  );
}

function Item({ item }) {
      console.log("item------------->")
  return (
    <ListBoxItem
      id={item.id}
      textValue={item.name}
      className="group relative py-1 px-2 outline-none cursor-default grid grid-rows-2 grid-flow-col auto-cols-max gap-x-3 rounded selected:bg-blue-500 text-slate-700 selected:text-white selected:[&:has(+[data-selected])]:rounded-b-none [&[data-selected]+[data-selected]]:rounded-t-none focus-visible:ring-2 ring-offset-2 ring-blue-500"
    >
      <Text slot="label" className="truncate">
        <Button slot="search">
          {item.companyName} {`(${item.ticker})`}
        </Button>{" "}
      </Text>
      <Text
        slot="description"
        className="truncate text-sm text-slate-600 group-selected:text-white"
      >
        {item.date}
      </Text>
      <div className="absolute left-0 right-2 bottom-0 h-px bg-gray-200 group-selected:bg-blue-400 [.group[data-selected]:has(+:not([data-selected]))_&]:hidden [.group:not([data-selected]):has(+[data-selected])_&]:hidden [.group[data-selected]:last-child_&]:hidden" />
    </ListBoxItem>
  );
}
