"use client";
import { useEffect, useState } from "react";
import useResizeHelper from "../../../components/resizeHelper";
import Card from "../../../components/card/card";
import Heading from "@/components/elements/headings";
import { Button, DialogTrigger } from "react-aria-components";


import { forEach } from "lodash";
// import Button from "@/components/buttons/button";

const News = ({search}) => {
  let hidden = window.innerWidth < 768 ? true : false; //TODO: fix server error window ReferenceError: window is not defined. Also there is refrence in useResizeHelper  as well

  const [sideNavHidden, setSideNavHidden] = useState(hidden);
  const [report, setReport] = useState([]);
  const isHidden = useResizeHelper(setSideNavHidden);
  const [currentSearch, setCurrentSearch] = useState(null);
    const [researchFtse, setResearchFtse] = useState([]);

  useEffect(() => {
    fetch(`/api/share-research?search=${search}`)  // Fetch latest news for ftse, dow etc
      .then((res) => res.json())
      .then((data) => {
        let newReport = [];

        console.log(newReport);
        setResearchFtse(data.message.results);
      });
      
  }, []);

  return (
    <>
      <div class="flex flex-row flex-wrap ">
        <Card tclass='w-full  '>
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Latest News For {search}
              </h5>
              <p class="mb-4 text-base  dark:text-neutral-200">
                {researchFtse.map((i) => (
                  <p> {i["title"]} <span class='text-xs text-neutral-400'> {i["time"]}</span></p>
                ))}
              </p>
  
            </Card>
      </div>
    </>
  );
};

export default News;
