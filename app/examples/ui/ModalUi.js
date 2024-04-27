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

import styles from "./styles.module.css"

import Card from "@/components/card/cardModal";

export function Modal({ title, children }) {
  return (
    <ModalOverlay className={styles.overlay}>
      <ModelAria className={styles.modal}>
        <Dialog className={styles.dialog}>
          {({ close }) => (
            <>
              {" "}
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {title}
              </h5>
              <div className={styles.bodyWrapper}>
                <div className={styles.body}>{children}</div>
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
