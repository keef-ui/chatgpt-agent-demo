'use client'
import {Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay} from 'react-aria-components';
// import Popover from './popover';
import style from"./style.module.css"
export default function UiComponents() {

  
   
    return ( <DialogTrigger>
      <Button>Open modal</Button>
      <ModalOverlay className={style.overlay}>
        <Modal className={style.modal}>
          <Dialog>
            {({close}) => <>
              <Heading slot="title">Notice</Heading>
              <p>This is a modal with a custom modal overlay.</p>
              <Button onPress={close}>Close</Button>
            </>}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
      )


}

// https://react-spectrum.adobe.com/react-aria/Modal.html

