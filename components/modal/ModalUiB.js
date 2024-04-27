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

export function Modal({ search, children}) {
  return (
    <ModelAria className="modal">
      <Dialog className="dialog">
        {({ close }) => (
          <>
            {children}
            <Button onPress={close} style={{ marginTop: 8 }}>
              Submit
            </Button>
          </>
        )}
      </Dialog>
    </ModelAria>
  );
}
