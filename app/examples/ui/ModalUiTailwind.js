"use client";
import {
  Button,
  Dialog,
  Heading,
  Input,
  Label,
  Modal as ModelAria,
  ModalOverlay,
  TextField,
} from "react-aria-components";

import Card from "@/components/card/cardModal";

export function Modal({ title, children }) {
  return (
    <ModalOverlay>
      <ModelAria className="modal">
        <Dialog className="dialog w-full flex flex-col p-[30px]">
          {({ close }) => (
            <>
              {" "}
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {title}
              </h5>
              <div className="flex-1 overflow-auto h-[80vh]">
                <div className=" h-[40vh]">{children}</div>
              </div>
              <Button onPress={close} style={{ marginTop: 8 }}>
                Submit
              </Button>
            </>
          )}
        </Dialog>
      </ModelAria>
    </ModalOverlay>
  );
}
