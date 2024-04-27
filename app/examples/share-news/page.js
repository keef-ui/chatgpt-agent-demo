"use client";
import { useEffect, useState, createContext } from "react";
import Nav from "../../../components/nav";
import Main from "../../../components/main/main-shares";
import useResizeHelper from "../../../components/resizeHelper";
import Card from "../../../components/card/card";
import Heading from "@/components/elements/headings";
import ListBox from "@/components/listBox/listBox";
import { isDateInThisWeek } from "@/components/dateHelpers/dateHelpers";


import { forEach } from "lodash";
// import Button from "@/components/buttons/button";
import { Modal } from "@/components/modal/ModalUi";
import News from "./news";
import { Button, DialogTrigger,ButtonContext,Modal as ModalB, ModalContext } from "react-aria-components";

const MyComponent = () => {
  let hidden = window.innerWidth < 768 ? true : false; //TODO: fix server error window ReferenceError: window is not defined. Also there is refrence in useResizeHelper  as well

  const [sideNavHidden, setSideNavHidden] = useState(hidden);
  const [report, setReport] = useState([]);
  const [researchFtse, setResearchFtse] = useState([]);
  const [researchDow, setResearchDow] = useState([]);
  const isHidden = useResizeHelper(setSideNavHidden);
  const [currentSearch, setCurrentSearch] = useState(null);
  let [isOpen, setOpen] = useState(false)

  const searchContext= createContext();
  useEffect(() => {
    const init = async () => {
      const { initTE, Sidenav } = await import("tw-elements");

      initTE({ Sidenav });
    };
    hidden = window.innerWidth < 768 ? true : false;
    setSideNavHidden(hidden);
    init(sideNavHidden);
    console.log(sideNavHidden);
    // const report = async () => { const a = await fetch('/api/freport'); return a }

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


    fetch("/api/share-research?search='Ftse latest'")  // Fetch latest news for ftse, dow etc
      .then((res) => res.json())
      .then((data) => {
        let newReport = [];

        console.log(newReport);
        setResearchFtse(data.message.results);
      });

      fetch("/api/share-research?search='dow jones latest'")  // Fetch latest news for ftse, dow etc
      .then((res) => res.json())
      .then((data) => {
        let newReport = [];

        console.log(newReport);
        setResearchDow(data.message.results);
      });

      
  }, []);

  return (
    <>
      <Nav items={items} sideNavHidden={sideNavHidden} />
      <Main sideNavHidden={sideNavHidden} setSideNavHidden={setSideNavHidden}>
        <>
          <div class="flex flex-row flex-wrap ">
            <Card tclass=" w-full xl:w-1/3">
              <searchContext.Provider value={setCurrentSearch}>
                {/* https://react-spectrum.adobe.com/react-aria/advanced.html */}
                <ButtonContext.Provider
                  value={{
                    slots: {
                      search: {
                        onPress: (e) => {
                          setOpen(true);
                        },
                      },
                      button2: {
                        onPress: (e) => {
                          setOpen(true);
                        },
                      },
                    },
                  }}
                >
                  {" "}
                  <ModalContext.Provider
                    value={{ isOpen, onOpenChange: setOpen }}
                  >
                    <Modal slot="button2">
                      <>
                        <div>
                          {" "}
                          <News search={currentSearch} />
                        </div>
                      </>
                    </Modal>
                  </ModalContext.Provider>
                  <ListBox
                    dataArray={report}
                    setCurrentSearch={setCurrentSearch}
                  />
                </ButtonContext.Provider>
              </searchContext.Provider>

              <Heading variant="h2">Upcoming Final Results</Heading>
              <p class="mb-4  text-base  dark:text-neutral-200 ">
                {report.map((i) => (
                  <p>
                    {" "}
                    {i[0]} -{" "}
                    <DialogTrigger>
                      <Button
                        onPress={(e) => setCurrentSearch(e.target.innerHTML)}
                      >
                        {i[1]}
                      </Button>
                      <Modal>
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
            <Card tclass="w-full xl:w-2/3 ">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                FTSE Latest News
              </h5>
              <p class="mb-4 text-base  dark:text-neutral-200">
                {researchFtse.map((i) => (
                  <p>
                    <a href={i["link"]}>
                      {" "}
                      {i["title"]}{" "}
                      <span class="text-xs text-neutral-400"> {i["time"]}</span>
                    </a>
                  </p>
                ))}
              </p>
            </Card>
            <Card tclass="w-full">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                DOW Jones Latest news
              </h5>
              <p class="mb-4 text-base  dark:text-neutral-200">
                {researchDow.map((i) => (
                  <p> {i["title"]} </p>
                ))}
              </p>
            </Card>
          </div>
        </>
      </Main>
    </>
  );
};

export default MyComponent;

const items = [
  {
    content: "Link 1", // The text content for the list item
    svgData: (
      <path
        // SVG path or any other valid SVG element
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
      />
    ),
  },
  {
    content: "Category 1",
    svgData: (
      <path
        // Another SVG path or any valid SVG element
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
        clip-rule="evenodd"
      />
    ),
  },
  // ... Additional items with the same structure
];
