"use client";
import { useEffect,useState } from "react";
import {
  Button,
  DialogTrigger,
} from "react-aria-components";
import { ModalUi } from "./ModalUi";




const MyComponent = () => {
const [currentSearch, setCurrentSearch] = useState(null)

  return (
    <>
      <DialogTrigger>
        <Button onPress={(e) => setCurrentSearch(e.target.innerHTML)}>
          company AAAA
        </Button>
        <ModalUi search={currentSearch}>
          <>
            <div> Company a........................{currentSearch}</div>
          </>
        </ModalUi>
      </DialogTrigger>
      <DialogTrigger>
        <Button onPress={(e) => setCurrentSearch(e.target.innerHTML)}>
          Company BBB
        </Button>
        <ModalUi search={currentSearch}>
          <>
            <div> Comapny bbbb........................{currentSearch}</div>
          </>
        </ModalUi>
      </DialogTrigger>
    </>
  );
};

export default MyComponent


