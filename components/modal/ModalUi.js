"use client";
import {
  Button,
  Dialog,
  Heading,
  Input,
  Label,
  Modal as ModelAria,
  TextField,
} from "react-aria-components";
import styles from "./Modal.module.css"


export function Modal({ search, children, slot="default"}) {
  return (
    <ModelAria className={styles.modal}>
      <Dialog className={styles.dialog}>
        {({ close }) => (
          <>
            <div className="flex-1 overflow-auto h-[50vh]">
              <div className=" h-[40vh]">{children}</div>
            </div>
            <Button slot={slot} onPress={close} style={{ marginTop: 8 }}>
              Submit
            </Button>
          </>
        )}
      </Dialog>
    </ModelAria>
  );
}
