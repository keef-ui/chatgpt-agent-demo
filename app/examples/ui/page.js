"use client";
import { useEffect, useState } from "react";
import useResizeHelper from "../../../components/resizeHelper";
import Card from "../../../components/card/card";
import Heading from "@/components/elements/headings";
import { Button, DialogTrigger } from "react-aria-components";
import { Modal } from "./ModalUi";
import News from "./news";

import { forEach } from "lodash";
// import Button from "@/components/buttons/button";

const Content = () => {
  let hidden = window.innerWidth < 768 ? true : false; //TODO: fix server error window ReferenceError: window is not defined. Also there is refrence in useResizeHelper  as well

  const [sideNavHidden, setSideNavHidden] = useState(hidden);
  const [report, setReport] = useState([]);
  const isHidden = useResizeHelper(setSideNavHidden);
const [currentSearch, setCurrentSearch] = useState(null);
  useEffect(() => {
    fetch("/api/freport?weeks=2") // Fetch list for upcoming finals
   .then((res) => res.json())
   .then((data) => {
     let newReport = [];
     data.message.forEach((i) => {
       for (let index = 0; index < i[0].length; index++) {
         if (Array.isArray(i[0][index])) {
           i[0][index].forEach((el) => {
             console.log(el);
             newReport.push(el);
           });
         }
       }
     });
     console.log(newReport);
     setReport(newReport);
   });
  }, []);

  return (
    <>
      <div class="flex flex-row flex-wrap ">
        <Card tclass=" w-full">
          <Heading variant="h2">Upcoming Final Results</Heading>
          <p class="mb-4  text-base  dark:text-neutral-200 ">
            {report.map((i) => (
              <p>
                {" "}
                {i[0]} -{" "}
                <DialogTrigger>
                  <Button onPress={(e) => setCurrentSearch(e.target.innerHTML)}>
                    {i[1]}
                  </Button>
                  <Modal title={`The Latest News For ${currentSearch}`}>
                    <>
                      <div>
                        {" "}
                        <News search={currentSearch} />
                      </div>
                    </>
                  </Modal>
                </DialogTrigger>{" "}
                - {i[2]}{" "}
              </p>
            ))}
          </p>
        </Card>
      </div>
    </>
  );
};



export default Content

