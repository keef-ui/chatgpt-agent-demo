"use client";
import {
  Button,
  Dialog, Heading,
  Input,
  Label,
  Modal,
  TextField
} from "react-aria-components";

export function ModalUi({ search,children }) {

  return (
    <Modal className="modal">
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
    </Modal>
  );

}
